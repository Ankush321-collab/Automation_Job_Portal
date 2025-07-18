import cron from 'node-cron';
import { Job } from '../Models/job.model.js';
import { User } from '../Models/User.Schema.js';
import { sendmail } from '../utils/sendmail.js';

export const newsLetterCron = () => {
    cron.schedule("*/1 * * * *", async () => {
        const jobs = await Job.find({ newlettersent: false });
        console.log("Found jobs to send newsletter:", jobs.length);
        if (jobs.length === 0) {
            console.log("No jobs found with newlettersent: false");
        }

        for (const job of jobs) {
            try {
                const filtereduser = await User.find({
                    role: "job seeker",
                    $or: [
                        { "preference.first_preference": job.preference },
                        { "preference.second_preference": job.preference },
                        { "preference.third_preference": job.preference },
                    ]
                });

                console.log(`Filtered users for job '${job.title}' (${job.preference}):`, filtereduser.length);

                if (filtereduser.length === 0) {
                    console.log(`No users found for job '${job.title}' with preference '${job.preference}'`);
                }

                for (const user of filtereduser) {
                    if (!user.email) {
                        console.log("Skipped: No email found for user", user._id);
                        continue;
                    }

                    console.log("Sending mail to:", user.email);

                    const subject = `Hot Job Alert: ${job.title} in ${job.preference} Available Now`;

                    const message = `Hi ${user.fullname},\n\nGreat news! A new job that fits your niche has just been posted. The position is for a ${job.title} with ${job.companyname}, and they are looking to hire immediately.\n\nJob Details:\n- Position: ${job.title}\n- Company: ${job.companyname}\n- Location: ${job.location}\n- Salary: ${job.salary}\n\nDon’t wait too long! Job openings like these are filled quickly. \n\nWe’re here to support you in your job search. Best of luck!\n\nBest Regards,\nNicheNest Team`;

                    try {
                        await sendmail(user.email, subject, message); // ✅ fixed call
                        console.log("Mail sent to:", user.email);
                    } catch (mailError) {
                        console.error("Error sending mail to", user.email, mailError);
                    }
                }

                job.newlettersent = true;
                console.log("Newsletter sent for job:", job.title);
                await job.save();
            } catch (error) {
                console.error(error || "Some error in Cron.");
            }
        }
    });
};
