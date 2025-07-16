const { Storage } = require("@google-cloud/storage");

/**
 * Lists all buckets in the Google Cloud project
 * Uses Application Default Credentials (ADC) for authentication
 */
async function listBuckets() {
  try {
    // Initialize the Storage client
    // This will automatically use Application Default Credentials
    const storage = new Storage();

    console.log("Fetching buckets...");

    // Get all buckets in the project
    const [buckets] = await storage.getBuckets();

    console.log(`Found ${buckets.length} bucket(s):`);

    if (buckets.length === 0) {
      console.log("No buckets found in the project.");
      return;
    }

    // Display bucket information
    buckets.forEach((bucket, index) => {
      console.log(`\n${index + 1}. Bucket: ${bucket.name}`);
      console.log(
        `   Location: ${bucket.metadata.location || "Not specified"}`
      );
      console.log(`   Created: ${bucket.metadata.timeCreated || "Unknown"}`);
      console.log(
        `   Storage Class: ${bucket.metadata.storageClass || "Standard"}`
      );
    });
  } catch (error) {
    console.error("Error listing buckets:", error.message);

    if (error.code === "ENOTFOUND") {
      console.log(
        "\nTip: Make sure you have set up Application Default Credentials:"
      );
      console.log(
        "1. Install Google Cloud CLI: https://cloud.google.com/sdk/docs/install"
      );
      console.log("2. Run: gcloud auth application-default login");
      console.log(
        "3. Set your project: gcloud config set project YOUR_PROJECT_ID"
      );
    } else if (error.code === "PERMISSION_DENIED") {
      console.log(
        "\nTip: Make sure your credentials have the necessary permissions to list buckets."
      );
    }
  }
}

// Run the function
listBuckets();
