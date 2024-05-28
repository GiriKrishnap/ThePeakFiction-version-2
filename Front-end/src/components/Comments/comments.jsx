import { DiscussionEmbed } from 'disqus-react';

const Comments = ({ novelId, chapterNo = 0 }) => {


    const disqusShortname = 'thepeakfiction'; // Replace with your actual Disqus shortname
    const disqusConfig = {
        url: `https://the-peak-fiction-version-2.vercel.app/${novelId + chapterNo}`, // Replace with your website URL
        identifier: `#${novelId + chapterNo}`, // Replace with a unique identifier for each page
        title: `${novelId + chapterNo}`, // Replace with the title of your page
    };

    return (
        <div>
            <h2>Comments</h2>
            <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </div>
    );
};

export default Comments;