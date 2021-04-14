const _get = (object, path) => {
	if (typeof path === "string") path = path.split(".").filter(key => key.length);
	return path.reduce((dive, key) => dive && dive[key], object);
};

export default _get;