import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';


const Header = ({ currentUser, hidden }) => (
    <div className="header">
        <Link className="logo-container" to='/'>
            <Logo className="logo" />
        </Link>

        <div className="options">
            <Link className="option" to='/shop'>
                SHOP
            </Link>
            <Link className="option" to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ?
                    (<div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>)
                    :
                    (<Link className="option" to='/signin'>
                        SIGN IN
                    </Link>)
            }
            <CartIcon />

        </div>
        {hidden ? null : <CartDropdown />}
    </div>
);

// before destructuring the values
// const mapStateToProps = state => ({
//     currentUser: state.user.currentUser
// })


// without using selector
// const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
//     currentUser,
//     hidden
// });

// using memoized selector
// createStructuredSelector will automatically pass the top level state we have, no need to pass the state seprately
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);