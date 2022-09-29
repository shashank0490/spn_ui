export const LANDING_PAGE = {
  getMenuList: 'landing-page',
  getSelectedMenuContent: 'landing-page?filters[pages][slug][$contains]=',
  getSelectedSlugContent: 'pages?slug='
};

export const REGISTRATION = {
  createOrgs: 'ngo/profile',
  getAllOrgs: 'organizations',
  userRegistration: 'user'
};
export const ORGANISATION = {
  getOrgByPan : 'ngo/profile?pancard=',
  getOrgByTxn:'ngo/profile?txnId='
};

export const LOGIN = {
  login: 'auth/login',
  logout: 'auth/logout',
  forgotPassword:'forgot-password',
  otpVerify:'verify-otp',
  resetPassword: 'update-password',
  createNewPasswordInit:'reset-password',
  createNewPassword:'reset/update-password'
};


export const Designation = {
  createDesignation: 'master/designation',
  getDesignation: 'master/designation',
};
export const OTP = {
  getOtp: 'send-otp',
};
export const INVITE = {
  sendInvite: 'invite-user',
  getInvitedUser:'invite-user'
};
export const USER = {
  updateUser:'user/update',
  getUser:'user?',
  getOtp:'user/update/send-otp'
}