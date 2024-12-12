import Link from "next/link";

interface Category {
	title: string;
	slug: string;
}

interface CategoryLinksProps {
	categories: Category[];
}

const CategoryLinks = ({ categories = [] }: CategoryLinksProps) => {
	return (
		<div className='flex flex-wrap font-inconsolata'>
			{categories.map((category, index) => (
				<span
					key={category.title}
					className='post-category'>
					<Link
						href={`/category/${category.slug}`}
						className='hover:underline'>
						{category.title}
					</Link>
					{index < categories.length - 1 && (
						<span>,&nbsp;</span>
					)}
				</span>
			))}
		</div>
	);
};

export default CategoryLinks;
