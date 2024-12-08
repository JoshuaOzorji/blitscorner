import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import { defineQuery } from "next-sanity";
import urlFor from "@/sanity/lib/urlFor";
import { MdPlayArrow } from "react-icons/md";
import ClientSideRoute from "../ClientSideRoute";
import CategoryLinks from "../CategoryLinks";
import Link from "next/link";

const options = { next: { revalidate: 60 } };
const featuredPostsQuery = defineQuery(`
  *[_type == "post" && "Featured" in categories[]->title]{
    title,
    slug,
    author->{
				name,
				slug
				},
    mainImage{
      asset->{
        url
      },
      alt
    },
		categories[]->{
      title,
			"slug": slug.current
    },
    publishedAt,
    body
  }
`);

const HeroLeft = async () => {
	const featuredPosts: Post[] = await client.fetch(
		featuredPostsQuery,
		{},
		options,
	);

	if (!Array.isArray(featuredPosts) || featuredPosts.length === 0) {
		return <p>No featured post(s) available</p>;
	}

	return (
		<div className='px-4 py-4 border-t md:border-t-0 md:border-r font-poppins'>
			{featuredPosts.map((post, index) => (
				<ClientSideRoute
					key={post._id}
					href={`/post/${post.slug?.current}`}
					className={`flex flex-col group ${index === 0 ? "first-item-class" : "other-item-class"} ${index !== featuredPosts.length - 1 ? "border-b mb-2 pb-2" : ""}`}>
					{index === 0 &&
						post.mainImage?.asset?.url && (
							<Image
								src={urlFor(
									post.mainImage,
								).url()}
								alt={
									post
										.mainImage
										.alt ||
									"Post image"
								}
								className='h-[28vh] sm:h-[20vh] md:h-[20vh] object-cover object-center rounded-lg w-full group-hover:opacity-75'
								width={300}
								height={300}
							/>
						)}

					<div className='py-1'>
						<div className='flex items-center gap-1'>
							<MdPlayArrow className='w-3 h-3' />
							<CategoryLinks
								categories={
									post.categories
								}
							/>
						</div>

						<h2 className='text-[18px] font-bold capitalize tracking-tight leading-[23px] group-hover:underline'>
							{post.title}
						</h2>
						<div className='author-date'>
							<p>
								by{" "}
								{post.author
									?.name &&
									post
										.author
										?.slug
										?.current && (
										<Link
											href={`/author/${post.author.slug.current}`}
											className='text-sec underline hover:text-pry'>
											{
												post
													.author
													.name
											}
										</Link>
									)}
							</p>

							<p>
								{new Date(
									post.publishedAt,
								).toDateString()}
							</p>
						</div>
					</div>
				</ClientSideRoute>
			))}
		</div>
	);
};

export default HeroLeft;
