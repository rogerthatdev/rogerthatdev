const BlogPage = ({ params }: { params: { blogId: string } }) => {
  console.log(params) // access the id in the URL
  return (
    <main>
      <h1>Dynamic AF</h1>

    </main>
  )
}

export default BlogPage