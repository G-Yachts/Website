"use server"

import {Destination} from "@/models/destination";
import {Charter} from "@/models/charter";
import {Yacht} from "@/models/yacht";

export const getDestinations = async () => {
    const res = await Destination.find()
        .catch((e) => {
            throw e;
        });
    return JSON.parse(JSON.stringify(res))
}

export const saveDestination = async (yacht: any) => {
    await Destination.findByIdAndUpdate(yacht._id, yacht).catch((e) => {
        throw e;
    });
}
export const removeDestination = async (id: string) => {
    await Destination.findByIdAndDelete(id).catch((e) => {
        throw e;
    });
    console.log(id, " removed")
}

export const uploadDestinationImages = async (event: any, id: string) => {
    try {
        event.preventDefault();
        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        const res = await fetch(`${process.env.API_URL}/images/destinations/${id}`, {
            method: "POST",
            body: formData,
        });
        return await res.json().then((d) => console.log(d));
    } catch (e) {
        console.error(e);
    }
};

export const getDestinationImages = async (id: string) => {
    try {
        const images = await Yacht.findById(id).select("photos.gallery").exec()
        console.log(images.photos.gallery)
        return Array.from(images.photos.gallery).map((image: any) => {
            return `${process.env.NEXT_PUBLIC_API}/images/destinations/${id}/${image}`
        });
    } catch (e) {
        console.error(e);
    }
}

export const addDestination = async (destination: any) => {
    destination._id =undefined;
    const res = await new Destination(destination).save().catch((e:any) => {
        const regex = /Path `(\w+)` is required/g;
        let missingFields = [];
        let match;

        while ((match = regex.exec(e)) !== null) {
            missingFields.push(match[1]);
        }
        if (missingFields.length === 0) {
            throw e;

        }
        const missingFieldsString = `Missing fields: (${missingFields.join(', ')})`;
        throw new Error(missingFieldsString);
    });
    return {status:"OK"};

}
export const removeDestinationImage = async (id: string, photo: string) => {
    await fetch(`${process.env.API_URL}/images/destinations/${id}/${photo}`, {
        method: "DELETE",
    }).then(async (d) => {
        console.log(d)
        const yacht = await Destination.findById(id).select("photos.gallery").exec()
        yacht.photos.gallery = yacht.photos.gallery.filter((image: any) => image !== photo);
        await yacht.save().catch((e: any) => {
            throw e;
        });
    }).catch((e) => {
        throw e;
    });
}