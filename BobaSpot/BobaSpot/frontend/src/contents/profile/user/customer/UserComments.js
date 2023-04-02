import React, { useState } from 'react';
import SingleComment from './SingleComment';
import ReviewCard from './ReviewCard';

const UserComments = () => {
    const [showOverlay, setShowOverlay] = useState(false);

    const handleShowMoreComment = () => {
        setShowOverlay(true);
    }

    const handleCloseOverlay = () => {
        setShowOverlay(false);
    }

    return (
        <div
            style={{
                background: '#FDD0CF',
                height: '100%',
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                filter: showOverlay ? 'blur(5px)' : 'none'
            }}>
                <SingleComment 
                    // reviewText={"OKOK"}
                    handleShowMoreComment={handleShowMoreComment} 
                    toggleShowOverlay={showOverlay} 
                />
                <SingleComment handleShowMoreComment={handleShowMoreComment} toggleShowOverlay={showOverlay} />
                <SingleComment handleShowMoreComment={handleShowMoreComment} toggleShowOverlay={showOverlay} />
                <SingleComment handleShowMoreComment={handleShowMoreComment} toggleShowOverlay={showOverlay} />
            </div>

            {/* how to parse data to show the overlay */}
            {showOverlay && <ReviewCard handleCloseOverlay={handleCloseOverlay} />}
        </div>
    )
}

export default UserComments;