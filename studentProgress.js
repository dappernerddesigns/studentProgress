const fs = require("fs/promises");

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

const progressWriter = async (rawInputText) => {
  const progressReport = progressCompiler(rawInputText);
  const time = new Date();

  const fullDate = `${time.getDate()}_${time.getMonth() + 1}`;
  const hour = time.getHours();
  const mins = time.getMinutes();
  const timeStamp = `${fullDate}_${hour}:${mins}`;
  const fileName = `Student_progress_${timeStamp}`;

  const write = fs.writeFile(`${fileName}.txt`, progressReport, "utf-8");
  await write;
};

module.exports = {
  studentProgressInputConverter,
  progressCompiler,
  progressWriter,
};
