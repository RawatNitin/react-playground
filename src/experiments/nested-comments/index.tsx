type TComment = {
  userName: string;
  userId: number;
  time: string;
  upvotes: number;
  dislikes: number;
  text: string;
  comments: TComment[];
};

const comments: TComment[] = [
  {
    userName: "John Doe",
    userId: 1,
    time: "2026-06-11",
    upvotes: 10,
    dislikes: 2,
    text: "This is a comment",
    comments: [
      {
        userName: "Jane Doe",
        userId: 2,
        time: "2026-06-11",
        upvotes: 10,
        dislikes: 2,
        text: "This is a comment 1",
        comments: [
          {
            userName: "Jane Doe",
            userId: 2,
            time: "2026-06-11",
            upvotes: 10,
            dislikes: 2,
            text: "This is a comment 1.1",
            comments: [
              {
                userName: "Jane Doe",
                userId: 2,
                time: "2026-06-11",
                upvotes: 10,
                dislikes: 2,
                text: "This is a comment 1.1.1",
                comments: [],
              },
            ],
          },
          {
            userName: "Jane Doe",
            userId: 2,
            time: "2026-06-11",
            upvotes: 10,
            dislikes: 2,
            text: "This is a comment 1.2",
            comments: [],
          },
          {
            userName: "Jane Doe",
            userId: 2,
            time: "2026-06-11",
            upvotes: 10,
            dislikes: 2,
            text: "This is a comment 1.3",
            comments: [],
          },
          {
            userName: "Jane Doe",
            userId: 2,
            time: "2026-06-11",
            upvotes: 10,
            dislikes: 2,
            text: "This is a comment 1.4",
            comments: [],
          },
        ],
      },
      {
        userName: "Jane Doe",
        userId: 2,
        time: "2026-06-11",
        upvotes: 10,
        dislikes: 2,
        text: "This is a comment 2",
        comments: [],
      },
      {
        userName: "Jane Doe",
        userId: 2,
        time: "2026-06-11",
        upvotes: 10,
        dislikes: 2,
        text: "This is a comment 3",
        comments: [],
      },
      {
        userName: "Jane Doe",
        userId: 2,
        time: "2026-06-11",
        upvotes: 10,
        dislikes: 2,
        text: "This is a comment",
        comments: [],
      },
    ],
  },
];

// console.log(comments);

export const NestedComments = () => {
  return (
    <div>
      <h1>Nested Comments</h1>
      <div>
        {comments.map((comment) => (
          <Comment key={comment.userId} comment={comment} />
        ))}
      </div>
    </div>
  );
};

const Comment = ({ comment }: { comment: TComment }) => {
  const { userName, userId, time, upvotes, dislikes, text, comments } = comment;
  return (
    <div
      style={{
        borderLeft: `1px dashed gray`,
        marginLeft: `30px`,
        paddingLeft: `20px`,
      }}
    >
      <h3>{text}</h3>
      <div style={{ display: "flex", gap: 30 }}>
        <span>
          By: {userName} ({userId})
        </span>
        <span>At: {time}</span>
        <span>Votes: {upvotes}</span>
        <span>Dislikes: {dislikes}</span>
        <span>Votes: {upvotes}</span>
      </div>
      {comments.length
        ? comments.map((comment) => <Comment key={userId} comment={comment} />)
        : null}
    </div>
  );
};
