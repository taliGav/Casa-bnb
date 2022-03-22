const track =
{
  _id: "tk101",
  name: "BA Track",
  courses: ["c101", "c102", "c103"]
}

const course =
{
  _id: "c101",
  title: "Basic Math",
  description: "Great course, from 0 to 100",
  imgUrl: "",
  chapters: [
    {
      id: 'c101-h101',
      name: 'Chapter1',
      desc: '',
      lessons: [
        {
          id: 'c101-h101-l101',
          name: 'Lesson1',
          desc: '',
          videoUrl: ''
        }
      ],
      tests: [
        {
          id: 'c101-h101-t101',
          name: 'Lesson1',
          desc: ''
        }
      ]
    }
  ],
}

const participation =
{
  _id: "o1225",
  createdAt: 9898989,
  startsAt: 9898989,
  endsAt: 9898989,
  participantUserId: "u101",
  trackId: "tk101",
  course: {
    _id: "c101",
    name: "Basic Math",
  },
  currTestIdx: 1,
  grades: [
    {
      chapterId: 'c101-h101',
      testId: 'c101-h101-t101',
      at: 9898989,
      grade: 46
    }
  ]

}

const user =
{
  _id: "u101",
  fullname: "User 1",
  imgUrl: "/img/img1.jpg",
  username: "user1",
  password: "secret",
  role: "student / trainer / admin"
}


