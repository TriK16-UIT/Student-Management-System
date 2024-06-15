import { tokens } from "../theme";

export const mockDataTNSV = [
  {
    id: 1,
    name: "Trương Hữu Trường Sơn",
    gender: "Nam",
    email: "21522559@gm.uit.edu.vn",
    access: "class"
  },
  {
    id: 2,
    name: "Phạm Phương Minh Trí",
    gender: "Nam",
    email: "21522708@gm.uit.edu.vn",
    access: "noclass"
  },
  {
    id: 3,
    name: "Nguyễn Hoàng Gia An",
    gender: "Nam",
    email: "22520021@gm.uit.edu.vn",
    access: "noclass"
  },
];

export const mockDataLDSL = [
  {
    id: 1,
    class: "10A4.1",
    grade: "10",
    students: [
      {
        id: 1,
        name: "Nguyễn Văn A",
        gender: "Nam",
        email: "student1@gm.uit.edu.vn",
        access: "class"
      },
      {
        id: 2,
        name: "Trần Thị B",
        gender: "Nữ",
        email: "student2@gm.uit.edu.vn",
        access: "noclass"
      },
      {
        id: 3,
        name: "Lê Văn C",
        gender: "Nam",
        email: "student3@gm.uit.edu.vn",
        access: "class"
      },
      {
        id: 4,
        name: "Phạm Thị D",
        gender: "Nữ",
        email: "student4@gm.uit.edu.vn",
        access: "noclass"
      },
      {
        id: 5,
        name: "Hoàng Văn E",
        gender: "Nam",
        email: "student5@gm.uit.edu.vn",
        access: "class"
      }
    ],
    classSize: "40" 
  },
  {
    id: 2,
    class: "11A4.1",
    grade: "11",
    students: [
      {
        id: 6,
        name: "Lê Văn F",
        gender: "Nam",
        email: "student6@gm.uit.edu.vn",
        access: "noclass"
      },
      {
        id: 7,
        name: "Nguyễn Thị G",
        gender: "Nữ",
        email: "student7@gm.uit.edu.vn",
        access: "class"
      },
      {
        id: 8,
        name: "Trần Văn H",
        gender: "Nam",
        email: "student8@gm.uit.edu.vn",
        access: "noclass"
      },
      {
        id: 9,
        name: "Phạm Văn I",
        gender: "Nam",
        email: "student9@gm.uit.edu.vn",
        access: "class"
      }
    ],
    classSize: "40" 
  },
  {
    id: 3,
    class: "12A4.1",
    grade: "12",
    students: [
      {
        id: 10,
        name: "Hoàng Thị J",
        gender: "Nữ",
        email: "student10@gm.uit.edu.vn",
        access: "noclass"
      },
      {
        id: 11,
        name: "Nguyễn Văn K",
        gender: "Nam",
        email: "student11@gm.uit.edu.vn",
        access: "class"
      },
      {
        id: 12,
        name: "Trần Thị L",
        gender: "Nữ",
        email: "student12@gm.uit.edu.vn",
        access: "noclass"
      },
      {
        id: 13,
        name: "Lê Văn M",
        gender: "Nam",
        email: "student13@gm.uit.edu.vn",
        access: "class"
      },
      {
        id: 14,
        name: "Phạm Thị N",
        gender: "Nữ",
        email: "student14@gm.uit.edu.vn",
        access: "noclass"
      },
      {
        id: 15,
        name: "Hoàng Văn O",
        gender: "Nam",
        email: "student15@gm.uit.edu.vn",
        access: "class"
      }
    ],
    classSize: "40" 
  }
];

export const mockDataSubjects = [
  {
    id: 1,
    subject: "Toán"
  },
  {
    id: 2,
    subject: "Vật lý"
  },
  {
    id: 3,
    subject: "Hóa"
  },
  {
    id: 4,
    subject: "Sinh học"
  },
  {
    id: 5,
    subject: "Lịch sử"
  },
  {
    id: 6,
    subject: "Địa lý"
  },
  {
    id: 7,
    subject: "Văn học",
  },
  {
    id: 8,
    subject: "Đạo đức"
  },
  {
    id: 9,
    subject: "Thể dục"
  }
];
export const mockDataTCSV = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    class: "10A1",
    TBHK1: 8.5,
    TBHK2: 9.0,
  },
  {
    id: 2,
    name: "Trần Thị B",
    class: "10A2",
    TBHK1: 7.0,
    TBHK2: 7.5,
  },
  {
    id: 3,
    name: "Lê Văn C",
    class: "10A1",
    TBHK1: 6.5,
    TBHK2: 7.0,
  },
  {
    id: 4,
    name: "Phạm Thị D",
    class: "10A3",
    TBHK1: 9.0,
    TBHK2: 9.5,
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    class: "10A2",
    TBHK1: 8.0,
    TBHK2: 8.2,
  },
];

export const mockDataAlpha = {
  users: [
    { UserID: 1, Username: "jdoe", Password: "password123", Role: "student", FirstName: "John", LastName: "Doe", Email: "jdoe@example.com" },
    { UserID: 2, Username: "asmith", Password: "password123", Role: "teacher", FirstName: "Anna", LastName: "Smith", Email: "asmith@example.com" },
    { UserID: 3, Username: "bwhite", Password: "password123", Role: "teacher", FirstName: "Bob", LastName: "White", Email: "bwhite@example.com" },
    { UserID: 4, Username: "mmiller", Password: "password123", Role: "student", FirstName: "Mia", LastName: "Miller", Email: "mmiller@example.com" },
  ],
  teachers: [
    { UserID: 2, SubjectID: 1 },
    { UserID: 3, SubjectID: 2 },
  ],
  students: [
    { StudentID: 1, ClassID: 1, FirstName: "John", LastName: "Doe", DateOfBirth: "2005-01-15", Address: "123 Main St", Email: "jdoe@student.com", Gender: true },
    { StudentID: 2, ClassID: 2, FirstName: "Mia", LastName: "Miller", DateOfBirth: "2006-02-20", Address: "456 Elm St", Email: "mmiller@student.com", Gender: false },
  ],
  classes: [
    { ClassID: 1, MaxStudents: 30, Name: "Math 101", GradeLevel: 10 },
    { ClassID: 2, MaxStudents: 25, Name: "English 101", GradeLevel: 10 },
  ],
  subjects: [
    { SubjectID: 1, Name: "Math" },
    { SubjectID: 2, Name: "English" },
  ],
  classSubjects: [
    { ClassID: 1, SubjectID: 1, UserID: 2 },
    { ClassID: 2, SubjectID: 2, UserID: 3 },
  ],
  grades: [
    { StudentID: 1, SubjectID: 1, Term: 1, Score15Min: 5.0, Score45Min: 9.0, ScoreAverage: 10 },
    { StudentID: 2, SubjectID: 2, Term: 1, Score15Min: 6.0, Score45Min: 8.0, ScoreAverage: 10 },
  ],
};

export const mockDataBeta = {
  users: [
    { UserID: 1, Username: "jdoe", Password: "password123", Role: "student", FirstName: "John", LastName: "Doe", Email: "jdoe@example.com" },
    { UserID: 2, Username: "asmith", Password: "password123", Role: "teacher", FirstName: "Anna", LastName: "Smith", Email: "asmith@example.com" },
    { UserID: 3, Username: "bwhite", Password: "password123", Role: "teacher", FirstName: "Bob", LastName: "White", Email: "bwhite@example.com" },
    { UserID: 4, Username: "mmiller", Password: "password123", Role: "student", FirstName: "Mia", LastName: "Miller", Email: "mmiller@example.com" },
    // Additional users...
  ],
  teachers: [
    { UserID: 2, SubjectID: 1 },
    { UserID: 3, SubjectID: 2 },
    // Additional teachers...
  ],
  students: [
    { StudentID: 1, ClassID: 1, FirstName: "John", LastName: "Doe", DateOfBirth: "2005-01-15", Address: "123 Main St", Email: "jdoe@student.com", Gender: true },
    { StudentID: 2, ClassID: 1, FirstName: "Jane", LastName: "Smith", DateOfBirth: "2005-03-22", Address: "456 Elm St", Email: "jsmith@student.com", Gender: false },
    { StudentID: 3, ClassID: 1, FirstName: "Alice", LastName: "Johnson", DateOfBirth: "2005-04-10", Address: "789 Maple St", Email: "ajohnson@student.com", Gender: false },
    { StudentID: 4, ClassID: 1, FirstName: "Bob", LastName: "Brown", DateOfBirth: "2005-06-30", Address: "101 Pine St", Email: "bbrown@student.com", Gender: true },
    { StudentID: 5, ClassID: 1, FirstName: "Charlie", LastName: "Davis", DateOfBirth: "2005-08-12", Address: "102 Oak St", Email: "cdavis@student.com", Gender: true },
    { StudentID: 6, ClassID: 1, FirstName: "Emily", LastName: "Wilson", DateOfBirth: "2005-09-18", Address: "103 Cedar St", Email: "ewilson@student.com", Gender: false },
    { StudentID: 7, ClassID: 1, FirstName: "Frank", LastName: "Taylor", DateOfBirth: "2005-10-25", Address: "104 Birch St", Email: "ftaylor@student.com", Gender: true },
    { StudentID: 8, ClassID: 1, FirstName: "Grace", LastName: "Anderson", DateOfBirth: "2005-11-03", Address: "105 Walnut St", Email: "ganderson@student.com", Gender: false },
    { StudentID: 9, ClassID: 1, FirstName: "Henry", LastName: "Thomas", DateOfBirth: "2005-12-19", Address: "106 Chestnut St", Email: "hthomas@student.com", Gender: true },
    { StudentID: 10, ClassID: 1, FirstName: "Isabella", LastName: "Moore", DateOfBirth: "2005-02-14", Address: "107 Poplar St", Email: "imoore@student.com", Gender: false },
    { StudentID: 11, ClassID: 2, FirstName: "Jack", LastName: "Martinez", DateOfBirth: "2006-01-17", Address: "108 Willow St", Email: "jmartinez@student.com", Gender: true },
    { StudentID: 12, ClassID: 2, FirstName: "Katie", LastName: "Robinson", DateOfBirth: "2006-03-24", Address: "109 Aspen St", Email: "krobinson@student.com", Gender: false },
    { StudentID: 13, ClassID: 2, FirstName: "Liam", LastName: "Clark", DateOfBirth: "2006-05-09", Address: "110 Alder St", Email: "lclark@student.com", Gender: true },
    { StudentID: 14, ClassID: 2, FirstName: "Mia", LastName: "Lee", DateOfBirth: "2006-07-28", Address: "111 Redwood St", Email: "mlee@student.com", Gender: false },
    { StudentID: 15, ClassID: 2, FirstName: "Noah", LastName: "Walker", DateOfBirth: "2006-08-15", Address: "112 Sycamore St", Email: "nwalker@student.com", Gender: true },
    { StudentID: 16, ClassID: 2, FirstName: "Olivia", LastName: "Hall", DateOfBirth: "2006-09-22", Address: "113 Fir St", Email: "ohall@student.com", Gender: false },
    { StudentID: 17, ClassID: 2, FirstName: "Paul", LastName: "Young", DateOfBirth: "2006-10-31", Address: "114 Cypress St", Email: "pyoung@student.com", Gender: true },
    { StudentID: 18, ClassID: 2, FirstName: "Quinn", LastName: "Hernandez", DateOfBirth: "2006-11-27", Address: "115 Spruce St", Email: "qhernandez@student.com", Gender: false },
    { StudentID: 19, ClassID: 2, FirstName: "Rachel", LastName: "King", DateOfBirth: "2006-12-23", Address: "116 Pine St", Email: "rking@student.com", Gender: false },
    { StudentID: 20, ClassID: 2, FirstName: "Sam", LastName: "Lopez", DateOfBirth: "2006-04-14", Address: "117 Oak St", Email: "slopez@student.com", Gender: true },
  ],
  classes: [
    { ClassID: 1, MaxStudents: 30, Name: "Math 101", GradeLevel: 10 },
    { ClassID: 2, MaxStudents: 25, Name: "English 101", GradeLevel: 10 },
  ],
  subjects: [
    { SubjectID: 1, Name: "Math" },
    { SubjectID: 2, Name: "English" },
  ],
  classSubjects: [
    { ClassID: 1, SubjectID: 1, UserID: 2 },
    { ClassID: 2, SubjectID: 2, UserID: 3 },
  ],
  grades: [
    { StudentID: 1, SubjectID: 1, Term: 1, Score15Min: 5.0, Score45Min: 9.0, ScoreAverage: 4 },
    { StudentID: 2, SubjectID: 1, Term: 1, Score15Min: 6.0, Score45Min: 8.0, ScoreAverage: 7.33 },
    { StudentID: 3, SubjectID: 1, Term: 1, Score15Min: 7.0, Score45Min: 7.5, ScoreAverage: 7.33 },
    { StudentID: 4, SubjectID: 1, Term: 1, Score15Min: 4.0, Score45Min: 6.0, ScoreAverage: 5.33 },
    { StudentID: 5, SubjectID: 1, Term: 1, Score15Min: 8.0, Score45Min: 7.0, ScoreAverage: 7.33 },
    { StudentID: 6, SubjectID: 1, Term: 1, Score15Min: 9.0, Score45Min: 9.0, ScoreAverage: 9.00 },
    { StudentID: 7, SubjectID: 1, Term: 1, Score15Min: 5.5, Score45Min: 6.0, ScoreAverage: 5.83 },
    { StudentID: 8, SubjectID: 1, Term: 1, Score15Min: 7.5, Score45Min: 8.0, ScoreAverage: 7.83 },
    { StudentID: 9, SubjectID: 1, Term: 1, Score15Min: 6.5, Score45Min: 7.0, ScoreAverage: 6.83 },
    { StudentID: 10, SubjectID: 1, Term: 1, Score15Min: 5.0, Score45Min: 5.5, ScoreAverage: 5.33 },
    { StudentID: 11, SubjectID: 2, Term: 1, Score15Min: 6.0, Score45Min: 7.5, ScoreAverage: 6.83 },
    { StudentID: 12, SubjectID: 2, Term: 1, Score15Min: 5.5, Score45Min: 8.0, ScoreAverage: 7.17 },
    { StudentID: 13, SubjectID: 2, Term: 1, Score15Min: 2, Score45Min: 6.5, ScoreAverage: 6.83 },
    { StudentID: 14, SubjectID: 2, Term: 1, Score15Min: 8.0, Score45Min: 8.0, ScoreAverage: 8.00 },
    { StudentID: 15, SubjectID: 2, Term: 1, Score15Min: 4.5, Score45Min: 5.5, ScoreAverage: 5.00 },
    { StudentID: 16, SubjectID: 2, Term: 1, Score15Min: 6.5, Score45Min: 6.5, ScoreAverage: 6.50 },
    { StudentID: 17, SubjectID: 2, Term: 1, Score15Min: 7.5, Score45Min: 8.0, ScoreAverage: 7.83 },
    { StudentID: 18, SubjectID: 2, Term: 1, Score15Min: 9.0, Score45Min: 8.5, ScoreAverage: 8.83 },
    { StudentID: 19, SubjectID: 2, Term: 1, Score15Min: 6.0, Score45Min: 7.0, ScoreAverage: 6.67 },
    { StudentID: 20, SubjectID: 2, Term: 1, Score15Min: 4, Score45Min: 9.0, ScoreAverage: 8.83 },
  ],
};