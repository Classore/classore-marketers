import {
	RiFacebookBoxLine,
	RiLinksLine,
	RiLinkedinBoxLine,
	RiTwitterXLine,
	RiWhatsappLine,
} from "@remixicon/react";

export const share_links = (url: string) => {
	return [
		{
			icon: RiLinksLine,
			label: "Copy referral link",
			href: url,
			action: "copy",
		},
		{
			icon: RiFacebookBoxLine,
			label: "Share to Facebook",
			href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
			action: "share",
		},
		{
			icon: RiTwitterXLine,
			label: "Share to Twitter",
			href: `https://twitter.com/intent/tweet?url=${url}`,
			action: "share",
		},
		{
			icon: RiLinkedinBoxLine,
			label: "Share to LinkedIn",
			href: `https://www.linkedin.com/shareArticle?url=${url}`,
			action: "share",
		},
		{
			icon: RiWhatsappLine,
			label: "Share on WhatsApp",
			href: `https://wa.me/${url}`,
			action: "share",
		},
	];
};
