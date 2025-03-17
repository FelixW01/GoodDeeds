const Accordion = () => {
    return (
        <>
            <div className="join join-vertical bg-base-100 w-8/12 mb-12">
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" defaultChecked/>
                    <div className="collapse-title font-semibold">What is GoodDeeds?</div>
                    <div className="collapse-content text-sm">GoodDeeds is a volunteer opportunity platform that connects individuals with organizations and causes they care about.</div>
                </div>
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4"/>
                    <div className="collapse-title font-semibold">How do I find volunteer opportunities?</div>
                    <div className="collapse-content text-sm">You can search for volunteer opportunities by location, cause, or organization. Simply click on the "Find Opportunities" button and filter your search results.</div>
                </div>
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4"/>
                    <div className="collapse-title font-semibold">How do I track my volunteer hours?</div>
                    <div className="collapse-content text-sm"> To track your volunteer hours, go to your dashboard. There, you will find a chart that displays your hours per month.
                        Each event that you have signed up for will have its corresponding hours listed. Please note that hours can only be inputted on the day the event occurs.</div>
                </div>
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4"/>
                    <div className="collapse-title font-semibold">How do I contact GoodDeeds support?</div>
                    <div className="collapse-content text-sm">You can contact GoodDeeds support by clicking on the "Contact Us" button at the bottom of the page or by sending an email to [support@gooddeeds.com](mailto:support@gooddeeds.com).</div>
                </div>
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4"/>
                    <div className="collapse-title font-semibold">Is GoodDeeds free to use?</div>
                    <div className="collapse-content text-sm">Yes, GoodDeeds is free to use for both individuals and organizations. We do not charge any fees for creating an account or posting volunteer opportunities.</div>
                </div>
            </div>
        </>
    )
}

export default Accordion;