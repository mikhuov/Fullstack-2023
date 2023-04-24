import React from 'react';
/* import PropTypes from 'prop-types' */

const Notifications = ({ notification }) => {
    if (!notification) {
        return null;
    } else {
        return (
            <div className={ notification.type }>
                { notification.text }
            </div>
        );
    }
};

export default Notifications;