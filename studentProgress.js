const fs = require("fs");
const path = require("path");

const studentProgressInputConverter = (inputText) => {
  const studentDataArr = inputText.split(/\s\s+/);
  const taskCount =
    studentDataArr[0].length === 0 ? 0 : studentDataArr[0].split(" ").length;
  const studentName = studentDataArr[1];

  const studentData = {
    taskCount,
    studentName,
  };

  return studentData;
};

const progressCompiler = (rawInputText) => {
  const rawInputArray = rawInputText.split("\n");
  const convertedStudents = rawInputArray.map((student) => {
    return studentProgressInputConverter(student);
  });
  const sortedStudents = convertedStudents.sort((a, b) => {
    if (a.taskCount > b.taskCount) {
      return 1;
    } else if (a.taskCount < b.taskCount) {
      return -1;
    } else {
      return 0;
    }
  });

  compiledResultString = sortedStudents
    .map(({ taskCount, studentName }) => {
      return `Task ${taskCount} - ${studentName}`;
    })
    .join("\n");

  return compiledResultString;
};

const progressWriter = (rawInputText) => {
  const progressReport = progressCompiler(rawInputText);
  console.log(progressReport);
  const time = new Date();
  const fullDate = time.toDateString();
  const hour = time.getHours();
  const mins = time.getMinutes();
  const timeStamp = `${fullDate} ${hour}:${mins}`;
  const fileName = `Student Progress ${timeStamp}`;

  fs.writeFileSync(`${fileName}.txt`, progressReport);
};

const getData = () => {
  const studentData = fs.readFileSync(
    path.resolve(__dirname, "./progress.txt"),
    "utf-8"
  );
  const lines = studentData.split("\n");
  return lines;
};

module.exports = {
  getData,
  studentProgressInputConverter,
  progressCompiler,
  progressWriter,
};
