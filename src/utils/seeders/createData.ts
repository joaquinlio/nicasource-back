import { QueryInterface } from "sequelize";

const usersData = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: "$2a$10$jEquFtjSsPcL058gTaHKHOOYYEkgZfhYzeby74BmlA2Wrkg265OEK",
    photo:
      "https://yt3.googleusercontent.com/_nlyMx8RWF3h2aG8PslnqMobecnco8XjOBki7dL_nayZYfNxxFdPSp2PpxUytjN4VmHqb4XPtA=s88-c-k-c0x00ffffff-no-rj",
    role: "Teacher",
  },
  {
    name: "example",
    email: "example@example.com",
    password: "$2a$10$eDSDrBgDslCmRcamPqBQ/eLfpHZGan/DiYXAPvpLLnHyC7u1BwRlO",
    photo:
      "https://yt3.googleusercontent.com/JNAugKWHFoTNsRfZTOOimJxaIRmzPPyBVI7klOuR3YFfvlzFoeNEuc8BnMasXspKFxQsEHKIsg=s88-c-k-c0x00ffffff-no-rj",
    role: "Student",
  },
  // Add more user data objects as needed
];

const followsData = [
  {
    followingId: 1,
    followerId: 2,
  },
  {
    followingId: 2,
    followerId: 1,
  },
  // Add more follows data objects as needed
];

const videosData = [
  {
    title: "My First Video",
    url: "https://www.youtube.com/watch?v=fmI_Ndrxy14",
    creationDate: new Date(),
    published: true,
    userId: 1,
  },
  {
    title: "My First Video",
    url: "https://www.youtube.com/watch?v=h7MYJghRWt0",
    creationDate: new Date(),
    published: true,
    userId: 2,
  },
  // Add more video data objects as needed
];

const videoLikesData = [
  {
    userId: 1,
    videoId: 1,
  },
  // Add more video likes data objects as needed
];

export async function up(queryInterface: QueryInterface): Promise<void> {
  // Create users table
  await queryInterface.bulkInsert("users", usersData);

  // Create follows table
  await queryInterface.bulkInsert("follows", followsData);

  // Create videos table
  await queryInterface.bulkInsert("videos", videosData);

  // Create videoLikes table
  await queryInterface.bulkInsert("videoLikes", videoLikesData);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  // Delete videoLikes table
  await queryInterface.bulkDelete("videoLikes", {});

  // Delete videos table
  await queryInterface.bulkDelete("videos", {});

  // Delete follows table
  await queryInterface.bulkDelete("follows", {});

  // Delete users table
  await queryInterface.bulkDelete("users", {});
}
