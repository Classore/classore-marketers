import {
	RiFacebookBoxLine,
	RiLinkedinBoxLine,
	RiTwitterXLine,
	RiWhatsappLine,
} from "@remixicon/react";

export const share_links = (url: string) => {
	return [
		{
			icon: RiFacebookBoxLine,
			label: "Share to Facebook",
			href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
		},
		{
			icon: RiTwitterXLine,
			label: "Share to Twitter",
			href: `https://twitter.com/intent/tweet?url=${url}`,
		},
		{
			icon: RiLinkedinBoxLine,
			label: "Share to LinkedIn",
			href: `https://www.linkedin.com/shareArticle?url=${url}`,
		},
		{
			icon: RiWhatsappLine,
			label: "Share on WhatsApp",
			href: `https://wa.me/${url}`,
		},
	];
};
