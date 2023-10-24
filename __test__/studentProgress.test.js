const {
  studentProgressInputConverter,
  progressCompiler,
  progressWriter,
} = require("../studentProgress");
const fs = require("fs");
const path = require("path");

const getData = () => {
  const studentData = fs.readFileSync(
    path.resolve(__dirname, "../progress.txt"),
    "utf-8"
  );
  const lines = studentData.split("\n");
  return lines;
};

describe("Student Progress Converter", () => {
  test("Given an input string can convert the Xs to a task number", () => {
    const input = " X X X X                                      Student One";
    expect(studentProgressInputConverter(input).taskCount).toBe(4);
  });
  test("Given an input string can convert the input to a task number and student name", () => {
    const input = " X X X X                                      Student One";
    expect(studentProgressInputConverter(input)).toEqual({
      taskCount: 4,
      studentName: "Student One",
    });
  });
  test("Given an input with no Xs returns Task 0", () => {
    const input = "Student Two";
    expect(studentProgressInputConverter(input)).toEqual({
      taskCount: 0,
      studentName: "Student Two",
    });
  });
});

describe("Progress compiler", () => {
  test("Takes an array of raw data strings and returns a single string with results on new lines", () => {
    const input = [
      " X X X X                                      Student One",
      " X X X X X X X                                Student Two",
    ];

    const expected = `Task 4 - Student One\nTask 7 - Student Two`;
    expect(progressCompiler(input)).toBe(expected);
  });
  test("Given an array of raw data organises the output in task order", () => {
    const input = [
      " X X X X                                      Student One",
      " X X                                          Student Two",
    ];
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
    const input = [
      " X X X X                                      Student One",
      " X X                                          Student Two",
    ];
    progressWriter(input);
    const studentData = fs.readFileSync(
      path.resolve(__dirname, "../Student Progress Fri Oct 13 2017 10:30.txt"),
      "utf-8"
    );
    const expected = `Task 2 - Student Two\nTask 4 - Student One`;
    expect(studentData).toBe(expected);
  });
});
