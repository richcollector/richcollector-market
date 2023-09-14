export const isValidName = (name: string): boolean => {
	return name === '';
};

export const isValidRemarks = (remarks: string): boolean => {
	return remarks === '';
};

export const isValidContents = (contents: string): boolean => {
	return contents === '<p><br></p>';
};

export const isValidPrice = (price: number): boolean => {
	return price === 0;
};

export const isValidTag = (tag: string): boolean => {
	return tag === '';
};

export const isValidImage = (image: string): boolean => {
	return !image.includes('blob');
};
