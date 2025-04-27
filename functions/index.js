const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteTask = functions.https.onCall(async (data) => {
  const taskId = data.taskId;

  try {
    await admin.firestore().collection("tasks").doc(taskId).delete();
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar en Firestore:", error);
    throw new functions.https.HttpsError("failed-precondition", "Error al eliminar la tarea");
  }
});
