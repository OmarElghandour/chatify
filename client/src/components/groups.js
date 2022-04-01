import React from "react";



const Groups = () => {
    return(
        <section className="section groups">
            <h1 className="section__title">Groups</h1>

            <div className="search-input-group">
                <i className='bx bx-search search-icon'></i>
                <input placeholder="search for name" className="search-input" />
            </div>


            <div className="groups__listing">
                <div className="groups__item row">
                    <div className="group-icon"></div>
                    <h4>group name</h4>
                </div>

                <div className="groups__item row">
                    <div className="group-icon"></div>
                    <h4>group name</h4>
                </div>


                <div className="groups__item row">
                    <div className="group-icon"></div>
                    <h4>group name</h4>
                </div>


                <div className="groups__item row">
                    <div className="group-icon"></div>
                    <h4>group name</h4>
                </div>


                <div className="groups__item row">
                    <div className="group-icon"></div>
                    <h4>group name</h4>
                </div>

            </div>
        </section>
    )
}

export default Groups;