import React from 'react';

const beemSms = (task,phoneNumber) => {

    const api_key = "8af1879fd7db45fc";
    const secret_key = "NDU5NGFmMTEyYmFjNGY0ODUyN2Q4Mjk0ZWQ5MDdjOTNlNWUzNDg3ZDBhYzZkOTZiNWMyZDFjZDQ0ZTc4YjY0NQ==";
    const source_addr = "INFO";

    const reqBody = {
        "source_addr": source_addr,
        "schedule_time": "",
        "encoding": 0,
        "message": `Congratulations on finishing "${task}" task. Keep crushing it`,
        "recipients": [
            {
                "recipient_id": 1,
                "dest_addr": phoneNumber,
            },

        ],
    }

    fetch("https://apisms.beem.africa/v1/send",{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa(api_key + ":" + secret_key)
        },
        body:JSON.stringify(reqBody)
    }).then((res) => res.json()).then((data) => {
        console.log(data)
    })
    return (
        <div>

        </div>
    );
};

export default beemSms;
