const fs = require("fs");

const studentProgressInputConverter = (inputText) => {
  const textArr = inputText.split(" ");
  const studentData = {};

  studentData.taskCount = textArr.filter((task) => {
    return task === "X";
  }).length;

  studentData.studentName = textArr
    .filter((element) => {
      if (element !== "X" && element !== " ") {
        return element;
      }
    })
    .join(" ");

  return studentData;
};

const progressCompiler = (rawProgressText) => {
  const convertedStudents = rawProgressText.map((student) => {
    return studentProgressInputConverter(student);
  });
  const sortedStudents = convertedStudents.sort((a, b) => {
    return a.taskCount > b.taskCount ? 1 : a.taskCount < b.taskCount ? -1 : 0;
  });

  let compiledResultString = "";

  sortedStudents.forEach(({ taskCount, studentName }, index) => {
    compiledResultString += `Task ${taskCount} - ${studentName}`;
    if (index !== sortedStudents.length - 1) {
      compiledResultString += `\n`;
    }
  });
  return compiledResultString;
};

const progressWriter = (rawProgressText) => {
  const progressReport = progressCompiler(rawProgressText);
  const time = new Date();
  const fullDate = time.toDateString();
  const hour = time.getHours();
  const mins = time.getMinutes();
  const timeStamp = `${fullDate} ${hour}:${mins}`;
  const fileName = `Student Progress ${timeStamp}`;

  fs.writeFileSync(`${fileName}.txt`, progressReport);
};

module.exports = {
  studentProgressInputConverter,
  progressCompiler,
  progressWriter,
};
