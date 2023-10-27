const {
  studentProgressInputConverter,
  progressCompiler,
  progressWriter,
} = require("../studentProgress");
const fs = require("fs");
const path = require("path");

describe("Student Progress Converter", () => {
  test("Given an input string can convert the Xs to a task number", () => {
    const input = "X X X X                                      Student One";
    expect(studentProgressInputConverter(input).taskCount).toBe(4);
  });
  test("Given an input string can convert the input to a student name", () => {
    const input = "X X X X                                      Student One";
    expect(studentProgressInputConverter(input).studentName).toBe(
      "Student One"
    );
  });
  test("Given an input with no Xs returns Task 0", () => {
    const input = "                                             Student Two";
    expect(studentProgressInputConverter(input).taskCount).toBe(0);
  });
  test("Does not increment task when student name has an X in it", () => {
    const input = "X X X      Student Xander";
    expect(studentProgressInputConverter(input).taskCount).toBe(3);
    expect(studentProgressInputConverter(input).studentName).toBe(
      "Student Xander"
    );
  });
  test("Does not increment task when student name has a single X in it", () => {
    const input = "                                             Professor X";
    expect(studentProgressInputConverter(input).taskCount).toBe(0);
    expect(studentProgressInputConverter(input).studentName).toBe(
      "Professor X"
    );
  });
});

describe("Progress compiler", () => {
  test("Accepts an input of raw data text from a single student compiles it into task format", () => {
    const input = "X X X X                                      Student One";

    const expected = `Task 4 - Student One`;
    expect(progressCompiler(input)).toBe(expected);
  });
  test("Accepts an input of raw data text from a several students and compiles it into task format", () => {
    const input = `X X X X                                      Student One\nX X X X X                                          Student Two`;

    const expected = `Task 4 - Student One\nTask 5 - Student Two`;
    expect(progressCompiler(input)).toBe(expected);
  });
  test("Accepts an input of raw data text from a several students and compiles it into task format in task order", () => {
    const input = `X X X X                                      Student One\nX X                                          Student Two`;

    const expected = `Task 2 - Student Two\nTask 4 - Student One`;
    expect(progressCompiler(input)).toBe(expected);
  });
});

describe("Progress writer", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date(2017, 9, 13, 10, 30));
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  test("Function creates a file with the current time stamp as a file name with the progress of the students ordered by task", () => {
    const input = `X X X X                                      Student One\nX X                                          Student Two`;
    progressWriter(input);
    const studentData = fs.readFileSync(
      path.resolve(__dirname, "../Student_progress_13_10_10:30.txt"),
      "utf-8"
    );
    const expected = `Task 2 - Student Two\nTask 4 - Student One`;
    expect(studentData).toBe(expected);
  });
});
