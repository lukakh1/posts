import { PostsFeed } from "@/app/features";

export default function HomeModule({
  postDisplay,
  postCardType,
}: {
  postDisplay: boolean;
  postCardType: number;
}) {
  return (
    <>
      {postDisplay && <div>posts should be displayed</div>}
      <PostsFeed postCardType={postCardType} />
    </>
  );
}
