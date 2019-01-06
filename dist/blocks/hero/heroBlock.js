var el = wp.element.createElement,
	registerBlockType = wp.blocks.registerBlockType,
	blockStyle = { backgroundColor: "#900", color: "#fff", padding: "20px" };

registerBlockType("claytercek/hero", {
	title: "hero",

	icon: "format-image",

	category: "layout",

	edit: function() {
		return el("p", { style: blockStyle }, "Hello editor.");
	},

	save: function() {
		return el("p", { style: blockStyle }, "Hello saved content.");
	}
});
