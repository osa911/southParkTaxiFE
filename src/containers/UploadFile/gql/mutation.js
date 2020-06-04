import { gql } from "apollo-boost";

export const UPLOAD_FILE_STREAM = gql`
	mutation SingleUploadStream($file: Upload!) {
		singleUploadStream(file: $file) {
			name
			rows {
				address
				value
      }
		}
	}
`;

