/* Who the legal pages are served by. Both addresses must stay monitored:
   data-rights requests arrive at privacyEmail, and account-deletion requests
   from people locked out of the app arrive at supportEmail. */
export const COMPANY = {
    legalEntity: "Seltrax Pvt Ltd",
    postalAddress: "15 MM Alam Road, Vouge Tower, Gulberg, Lahore, Pakistan",
    privacyEmail: "privacy@seltrax.com",
    supportEmail: "support@seltrax.com",
    jurisdiction: "Pakistan",
} as const
