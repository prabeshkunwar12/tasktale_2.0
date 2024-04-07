### Tasker Registration Functionality Documentation

#### Backend and Database

For the tasker registration functionality, we require a separate model to accommodate additional information specific to taskers. Below are the details of the required model and associated API functionalities:

#### Tasker Profile Model:
- **Fields:**
  - **User Information:**
    - Name
    - Email
    - Password
    - Phone Number (to be verified)
  - **Tasker Specific Information:**
    - Picture
    - Verification ID
    - List of Gigs for each subtype they are interested in and eligible for
    - Experience
    - Additional Information (optional)
- **Methods:**
  - Register: Endpoint to register a new tasker profile
  - Update Profile: Endpoint to update tasker profile information
  - Get Profile: Endpoint to retrieve tasker profile information
  - Delete Profile: Endpoint to delete tasker profile (optional)

#### Backend API:

- **TRPC Functions:**
  - **Post Function:**
    - StoreTaskerInfo: Function to store tasker information received from the registration form.

- **UploadThing Functions:**
  - UploadTaskerPicture: Function to upload tasker's profile picture to the UploadThing service.
  - UploadVerificationID: Function to upload tasker's verification ID to the UploadThing service.

- **Messaging Service:**
  - Phone Number Verification: Implement a messaging service to verify tasker's phone number. This can be achieved using SMS verification codes or other methods.

- **Future Considerations:**
  - AI Verification: Consider implementing AI-based verification for tasker's identification documents and profile pictures. This can enhance security and authenticity.

#### Documentation Structure:
1. Introduction
2. Tasker Profile Model
   - Description of Fields
   - Explanation of Methods
3. Backend API
   - TRPC Functions
   - UploadThing Functions
   - Messaging Service
4. Future Considerations
   - AI Verification
5. Conclusion
