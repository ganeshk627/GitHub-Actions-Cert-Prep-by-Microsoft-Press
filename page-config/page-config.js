
export const homepageConfig = {
    TITLE: 'A place to practice your automation skills!',
};

export const forgotpasswordConfig = {
    TITLE: 'Forgot Your Password?',
    URL: /.*account\/forgotten\/password/,
    RESET_PASSWORD_MESSAGE: 'Success: Password reset link has been sent to your e-mail address.',
}

export const forgotloginConfig = {
    TITLE: 'Forgot Your Login Name?',
    URL: /.*account\/forgotten\/loginname/,
}

export const loginConfig = {
    TITLE: 'Account Login',
    URL: /.*account\/login/,
}

export const dashboardConfig = {
    TITLE: 'My Account',
    URL: /.*account\/account/,
    WELCOME_MESSAGE: /Welcome back.*/,
}

export const productnavigationConfig = {
    URL: /product\/category/,
}

export const productbasketConfig = {
    TITLE: 'Shopping Cart',
    URL: /checkout\/cart/,
}
 
export const checkoutconfirmationConfig = {
    TITLE: 'Checkout Confirmation',
    URL: /checkout\/confirm/,
}

export const checkoutpaymentConfig = {
    TITLE: 'Payment Information',
    URL: /checkout\/payment/,
}

export const checkoutsuccessConfig = {
    TITLE: 'Your Order Has Been Processed!',
    URL: /checkout\/success/,
    ORDER_SUCCESS_MESSAGE: "Your Order Has Been Processed!",
}

export const facebookConfig = {
    // TITLE: /Facebook\.*/,
    TITLE: 'Facebook – log in or sign up',
    URL: 'https://www.facebook.com/',
}

export const twitterConfig = {
    TITLE: 'X. It’s what’s happening / X',
    URL: 'https://twitter.com/',
}

export const linkedinConfig = {
    TITLE: 'LinkedIn: Log In or Sign Up',
    URL: 'https://uk.linkedin.com/',
}

export const currencyConfig = {
    // TITLE: 'A place to practice your automation skills!',
    URL_EUR: /\.*currency=EUR/,
    URL_GBP: /\.*currency=GBP/,
    URL_USD: /\.*currency=USD/,

    CURRENCY_SYMBOL_EUR: '€',
    CURRENCY_SYMBOL_GBP: '£',
    CURRENCY_SYMBOL_USD: '$',

};

export const specialofferConfig = {
    TITLE: 'Special Offers',
    URL: /product\/special/,
}




