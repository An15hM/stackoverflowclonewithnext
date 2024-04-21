import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import React from "react";
import { QuestionFilters } from "@/constants/filters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

// const questions = [
//   {
//     _id: "1",
//     title: "How to implement binary search in JavaScript?",
//     tags: [
//       { _id: "tag1", name: "JavaScript" },
//       { _id: "tag2", name: "Algorithm" },
//     ],
//     author: {
//       _id: "author1",
//       name: "John Doe",
//       picture: "https://randomuser.me/api/portraits/men/1.jpg",
//     },
//     upvotes: 100,
//     views: 500,
//     createdAt: new Date("2023-12-01"),
//     answers: [
//       {
//         _id: "answer1",
//         text: "Here's a simple implementation of binary search in JavaScript.",
//         createdAt: new Date("2024-01-01"),
//       },
//       {
//         _id: "answer2",
//         text: "Check out this optimized version of binary search.",
//         createdAt: new Date("2024-01-05"),
//       },
//     ],
//   },
//   {
//     _id: "2",
//     title: "How to use React Hooks effectively?",
//     tags: [
//       { _id: "tag3", name: "React" },
//       { _id: "tag4", name: "Frontend" },
//     ],
//     author: {
//       _id: "author2",
//       name: "Jane Smith",
//       picture: "https://randomuser.me/api/portraits/women/2.jpg",
//     },
//     upvotes: 150,
//     views: 700,
//     createdAt: new Date("2023-11-15"),
//     answers: [
//       {
//         _id: "answer3",
//         text: "Explaining the best practices for using React Hooks.",
//         createdAt: new Date("2024-01-10"),
//       },
//     ],
//   },
//   {
//     _id: "3",
//     title: "How to optimize SQL queries for better performance?",
//     tags: [
//       { _id: "tag5", name: "SQL" },
//       { _id: "tag6", name: "Database" },
//     ],
//     author: {
//       _id: "author3",
//       name: "Alice Johnson",
//       picture: "https://randomuser.me/api/portraits/women/3.jpg",
//     },
//     upvotes: 80,
//     views: 300,
//     createdAt: new Date("2023-10-20"),
//     answers: [],
//   },
//   {
//     _id: "4",
//     title: "How to secure RESTful APIs using JWT authentication?",
//     tags: [
//       { _id: "tag7", name: "Security" },
//       { _id: "tag8", name: "Authentication" },
//     ],
//     author: {
//       _id: "author4",
//       name: "Robert Williams",
//       picture: "https://randomuser.me/api/portraits/men/4.jpg",
//     },
//     upvotes: 120,
//     views: 600,
//     createdAt: new Date("2023-09-25"),
//     answers: [
//       {
//         _id: "answer4",
//         text: "Here's how to implement JWT authentication in Node.js.",
//         createdAt: new Date("2024-02-15"),
//       },
//     ],
//   },
//   {
//     _id: "5",
//     title: "How to handle CORS issues in Express.js?",
//     tags: [
//       { _id: "tag9", name: "Node.js" },
//       { _id: "tag10", name: "Express.js" },
//     ],
//     author: {
//       _id: "author5",
//       name: "Emily Brown",
//       picture: "https://randomuser.me/api/portraits/women/5.jpg",
//     },
//     upvotes: 200,
//     views: 1000,
//     createdAt: new Date("2023-08-30"),
//     answers: [],
//   },
//   {
//     _id: "6",
//     title: "How to deploy a Django application on AWS?",
//     tags: [
//       { _id: "tag11", name: "Python" },
//       { _id: "tag12", name: "Django" },
//     ],
//     author: {
//       _id: "author6",
//       name: "Michael Clark",
//       picture: "https://randomuser.me/api/portraits/men/6.jpg",
//     },
//     upvotes: 90,
//     views: 400,
//     createdAt: new Date("2023-07-15"),
//     answers: [
//       {
//         _id: "answer5",
//         text: "Step-by-step guide for deploying Django on AWS.",
//         createdAt: new Date("2024-03-01"),
//       },
//     ],
//   },
//   {
//     _id: "7",
//     title: "How to use Git effectively in a team environment?",
//     tags: [
//       { _id: "tag13", name: "Version Control" },
//       { _id: "tag14", name: "Git" },
//     ],
//     author: {
//       _id: "author7",
//       name: "Sophia Martinez",
//       picture: "https://randomuser.me/api/portraits/women/7.jpg",
//     },
//     upvotes: 180,
//     views: 800,
//     createdAt: new Date("2023-06-10"),
//     answers: [
//       {
//         _id: "answer6",
//         text: "Best practices for collaborative Git workflows.",
//         createdAt: new Date("2024-03-05"),
//       },
//       {
//         _id: "answer7",
//         text: "Handling merge conflicts in Git.",
//         createdAt: new Date("2024-03-08"),
//       },
//     ],
//   },
//   {
//     _id: "8",
//     title: "How to optimize performance in a React Native app?",
//     tags: [
//       { _id: "tag15", name: "React Native" },
//       { _id: "tag16", name: "Mobile Development" },
//     ],
//     author: {
//       _id: "author8",
//       name: "David Wilson",
//       picture: "https://randomuser.me/api/portraits/men/8.jpg",
//     },
//     upvotes: 250,
//     views: 1200,
//     createdAt: new Date("2023-05-20"),
//     answers: [],
//   },
//   {
//     _id: "9",
//     title: "How to implement OAuth2 authentication in Spring Boot?",
//     tags: [
//       { _id: "tag17", name: "Java" },
//       { _id: "tag18", name: "Spring Boot" },
//     ],
//     author: {
//       _id: "author9",
//       name: "Emma Taylor",
//       picture: "https://randomuser.me/api/portraits/women/9.jpg",
//     },
//     upvotes: 140,
//     views: 650,
//     createdAt: new Date("2023-04-15"),
//     answers: [
//       {
//         _id: "answer8",
//         text: "Detailed guide for implementing OAuth2 in Spring Boot applications.",
//         createdAt: new Date("2024-03-10"),
//       },
//     ],
//   },
//   {
//     _id: "10",
//     title: "How to perform unit testing in Angular?",
//     tags: [
//       { _id: "tag19", name: "Angular" },
//       { _id: "tag20", name: "Testing" },
//     ],
//     author: {
//       _id: "author10",
//       name: "Olivia Lee",
//       picture: "https://randomuser.me/api/portraits/women/10.jpg",
//     },
//     upvotes: 300,
//     views: 1500,
//     createdAt: new Date("2023-03-10"),
//     answers: [],
//   },
// ];
interface Props {
  userId: string;
}
const fetchData = async ({ userId }: Props) => {
  try {
    const result = await getSavedQuestions({ clerkId: userId });

    return result;
    // Process result
  } catch (error) {
    console.error("Error fetching questions:", error);
    // Handle error (e.g., display error message)
  }
};

const CollectionPage = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const result = await fetchData({ userId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="flex-1 min-h-[56px]  sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result && result?.questions?.length > 0 ? (
          result.questions.map((question) => (
            // {questions.length > 0 ? (
            //   questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              createdAt={question.createdAt}
              answers={question.answers}
            />
          ))
        ) : (
          <NoResult
            title="There's no saved question to show"
            description="Save A Question that you might need to view them later."
            linkTitle="Save a question"
            link="/"
          />
        )}
      </div>
    </>
  );
};

export default CollectionPage;
