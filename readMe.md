# Student Progress

Create a function that will take the students progress, and order it based on the task the student is upto.

A typical progress output looks like this:

```
 X X X X                                      Student One
 X X X X X X X                                Student Two
                                              Student Three
 X X X                                        Student Four
 X X X X                                      Student Five
 X X X X X X X X                              Student Six
```

The function should format the data to show the current task the student is on, along with their name

These should then be sorted in order of task - lowest to highest

Your sorted data should be saved to a new file.

The above would look like:

```
Task 0 - Student Three
Task 3 - Student Four
Task 4 - Student One
Task 4 - Student Five
etc
```

Things to note:

A student's name could contain an X
There are not the same number of tasks for each sprint
A student could be on task 0/have completed no tasks so far
Sprint task numbers can go above 9
