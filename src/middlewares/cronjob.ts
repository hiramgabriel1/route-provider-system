import moment from "moment-timezone";
import cron from "node-cron";
import requestProductsMarks from "../models/requestProducts.model";

const timezone = "America/Monterrey";

export const deleteDataCronJob = () => {
    cron.schedule(
        "0 0 * * 1",
        async () => {
            try {
                moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

                let deletedData = await requestProductsMarks.deleteMany({});
            
                console.log(deletedData);
            } catch (error) { 
                console.error(error)
            }
        },
        {
            timezone: timezone,
        }
    );
};
