Team — GlobalLink
=================================

This document lists the team members and describes the UI-level tasks each member contributed to for the GlobalLink prototype. 

Summary
-------
- Project repository: https://github.com/manthranatarajan/CS4352-DesignProject-GlobalLink
- Deliverable: React SPA prototype with Signup, Login, Search, Profile, Job Feed, and Job Preferences.

Team Members
-------------------------------------
1. Manthra Natarajan (GitHub: `manthranatarajan`)
   - UI contributions:
     - Implemented `welcomePage.jsx`
     - Implemented `JobFeedPage.jsx`
     - Implemented `LoginPage.jsx`
     - Added all fields of create account and job reccomendation data into localstorage (mockbackend/JSON structure) and populated all the fields on user profile and user search profiles on cardviews.
     - Implemented `UserSearch.jsx`, wired to `public/users.json` and localStorage `_profile` entries; added deduplication and search filtering logic.
     - Implemented `UserProfile.jsx` to read and display profiles from localStorage and support both legacy and new storage keys.
     - Created back button functionality for edit user profile feature
     - Wrote documentation in `docs/ReadMe.md` and `docs/Source.md` and created this team document.

2. Mikael Sagarwala (GitHub: `<MikaelSag>`)
   - UI contributions:
     - Implemented `SignupPage.jsx`
     - Updated `UserProfile.jsx` to display more user information and added more reactivity to the adding a friend feature
     - Updated `CurrentUserProfile.jsx` to display all of the information the user entered when creating their account
     - Added confirmation for required fields in signup and profile forms
     - Implemented date validation to limit entries to only logical dates
     - Removed useless back buttons from navigation flow
     - Removed functionless profile components and cleaned up UI
     - Updated required fields validation across signup and profile pages
     - Contributed to the DP4 powerpoint, detailing the target users, usability features, and overall UI design
     - Demonstrated the completed application in a walkthrough video showcasing the 3 tasks


3. Nicolas Hartono (GitHub: `WhizpyH`)
   - UI contributions:
     - Implemented `CurrentUserProfile.jsx` to display the logged-in user's complete profile
     - Updated `App.js` to implement backend storage and dummy profiles for testing
     - Updated `LoginPage.jsx` to include a user login storage system with authentication
     - Updated `SignupPage.jsx` to include a user sign-up storage system with profile persistence
     - Implemented image save functionality using Redux for profile pictures
     - Reconfigured data storage to use Redux Toolkit with Redux Persist for state management
     - Set up Redux store configuration in `src/redux/store.js`
     - Created Redux slices for user state (`userSlice.js`) and image state (`imageSlice.js`)
     - Implemented autofill functionality for editing profile and job preferences
     - Created edit back button functionality for job preference page
     - Contributed to the DP4 progress report and documentation
     - Converted `docs/ReadMe.md`, `docs/Source.md`, and `docs/Team.md` to PDF format for submission 

4. Yaqub Ahmed (GitHub: `yaqubahm`)
   - UI contributions:
      - Created the logo of the app
      - Implemented the job preferences page `JobPrefrences.jsx`
      - Created the job preferences tagging/labels system for job feed `JobFeedPage.jsx` 
      - Created 30 random fake job data to feed into the job feed `JobFeedPage.jsx`
      - Implemented transition/ambient animations on various pages 
      - Fixed bugs with logging in and logging out
      - Helped create the DP4 powerpoint presentation
      - Contributed to DP4


5. Eslam Shamait (GitHub: `Eslamoo177`)
   - UI contributions:
      - Contributed to `UserSearch.jsx` implementation and user interface design
      - Assisted with the DP4 powerpoint presentation