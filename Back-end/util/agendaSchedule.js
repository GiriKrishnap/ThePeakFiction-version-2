const Agenda = require('agenda');
const NovelModel = require('../model/novelModel');

const agenda = new Agenda({ db: { address: process.env.CONNECTION_STRING } });

// Define the job
agenda.define('schedule-novel', async (job) => {
    const { NovelId, title, content, gcoin, chapterNumber, scheduleDate, scheduleTime, currentDate } = job.attrs.data;

    try {
        await NovelModel.updateOne({ _id: NovelId }, {
            $push: {
                chapters: {
                    number: chapterNumber,
                    title,
                    content,
                    publish_date: currentDate,
                    gcoin: gcoin || 0
                }
            },
            $set: { updated_date: currentDate, scheduled: '' }
        })

        console.log(`Chapter scheduled at ${scheduleDate} - ${scheduleTime}`);

    } catch (err) {
        console.error(err);
    }
});

// Start the Agenda instance
async function startAgenda() {
    await agenda.start();
    console.log('Agenda started');
}

startAgenda();

module.exports = agenda;