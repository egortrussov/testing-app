export const convertTimeShort = seconds => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
};

export const convertTime = seconds => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds - hrs * 3600) / 60);
    const secs = seconds - hrs * 3600 - mins * 60;

    let result = '';
    if (hrs) 
        result += hrs.toString() + ` hour${ hrs !== 1 ? 's' : '' } `;
    if (mins)
        result += mins.toString() + ` minute${ mins !== 1 ? 's' : '' } `;
    if (secs) 
        result += secs.toString() + ` second${ secs !== 1 ? 's' : '' } `;
    
    return result;
};
