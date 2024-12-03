import { client } from "@/sanity/lib/client";
import { Post, Tag } from "@/types";
import BreadCrumb from "@/components/BreadCrumb";
import { PostCard } from "@/components/PostCard";

interface TagPageProps {
	params: { slug: string };
}

const TagPage = async ({ params }: TagPageProps) => {
	const tag: Tag = await client.fetch(
		`*[_type == "tag" && slug.current == $slug][0]{
      name,
      description,
      "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc){
        _id,
        title,
        "slug": slug.current,
        mainImage{
          asset->{
            url
          },
          alt
        },
        publishedAt,
        shortDescription
      }
    }`,
		{ slug: params.slug },
	);

	if (!tag) {
		return <p>Tag not found</p>;
	}

	console.log("params:", params);

	return (
		<main className='mx-auto'>
			<BreadCrumb
				categories={[
					{ title: tag.name, slug: params.slug },
				]}
			/>
			<div className=''>
				<h1 className='text-3xl font-bold'>
					{tag.name}
				</h1>
				{tag.description && (
					<p className='mt-4 text-lg text-gray-700'>
						{tag.description}
					</p>
				)}
			</div>
			<div className='mt-8'>
				<h2 className='mb-4 text-xl font-bold'>
					Posts tagged with {tag.name}
				</h2>
				<div className='flex flex-wrap sm:grid sm:grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-4'>
					{tag.posts.map((post: Post) => (
						<PostCard
							key={post._id}
							post={post}
						/>
					))}
				</div>
			</div>
		</main>
	);
};
export default TagPage;
