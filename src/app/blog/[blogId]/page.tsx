export default function Page({ params }: { params: { blogId: string } }) {
  return <div>My Post: {params.blogId}</div>
}