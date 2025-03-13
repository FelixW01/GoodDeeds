import EventList from "../components/EventList.jsx";
import {EventProvider} from "../../context/eventContext.jsx";

function ListingPage() {

    return (
        <>
            <h1 className='text-3xl lg:text-5xl font-bold text-center mt-10'>Find Events</h1>
            <EventProvider>
                <EventList/>
            </EventProvider>
        </>
    )
}

export default ListingPage
