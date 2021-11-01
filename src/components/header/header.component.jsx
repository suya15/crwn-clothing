import React from 'react';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { HeaderContainer,
     LogoContainer,
    //   OptionDiv, 
      OptionLink, 
      OptionsContainer } from './header.styles';
import { signOutStart } from '../../redux/user/user.actions';


const Header = ({ currentUser, hidden, signOutStart }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className="logo" />
        </LogoContainer>

        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                    (
                        // <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
                        // another way of same css for diff element in styled component library
                        // <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
                        <OptionLink as='div' onClick={signOutStart}>SIGN OUT</OptionLink>
                    )
                    :
                    (<OptionLink to='/signin'>
                        SIGN IN
                    </OptionLink>)
            }
            <CartIcon />

        </OptionsContainer>
        {hidden ? null : <CartDropdown />}
    </HeaderContainer>
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

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);