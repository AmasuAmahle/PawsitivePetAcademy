import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

//Screens i have
type Screen = "home" | "courses" | "bill" | "contact";

//course structure
interface Course {
  name: string;
  duration: string;
  type: string;
  price: number;
  description: string;
}

//available courses
const courses: Course[] = [
  {
    name: "Canine Obedience Training",
    duration: "12 WEEKS",
    type: "PROFESSIONAL",
    price: 1500,
    description:
      "Learn professional obedience techniques for dogs from experienced professionals.",
  },
  {
    name: "Puppy Care",
    duration: "6 WEEKS",
    type: "SHORT COURSE",
    price: 750,
    description: "Learn how to care for your puppy in the best ways possible.",
  },
  {
    name: "Pet Grooming",
    duration: "6 MONTHS",
    type: "PROFESSIONAL",
    price: 1500,
    description: "To provide professional grooming skills for domestic pets.",
  },
  {
    name: "Animal Behaviour",
    duration: "6 MONTHS",
    type: "PROFESSIONAL",
    price: 1500,
    description:
      "To understand common pet behaviours and improve communication with animals.",
  },
  {
    name: "Pet Business Management",
    duration: "6 MONTHS",
    type: "PROFESSIONAL",
    price: 1500,
    description:
      "To prepare learners to operate a successful pet-related business.",
  },
  {
    name: "Pet First Aid",
    duration: "6 WEEKS",
    type: "SHORT COURSE",
    price: 750,
    description:
      "To provide learners with the knowledge and skills to respond to pet emergencies.",
  },
  {
    name: "Basic Dog Walking",
    duration: "6 WEEKS",
    type: "SHORT COURSE",
    price: 750,
    description: "To teach safe and professional dog walking practices.",
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleCourse = (course: Course) => {
    const alreadySelected = selectedCourses.some(
      (selectedCourse) => selectedCourse.name === course.name
    );

    if (alreadySelected) {
      setSelectedCourses(
        selectedCourses.filter(
          (selectedCourse) => selectedCourse.name !== course.name
        )
      );
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const subtotal = selectedCourses.reduce((total, course) => total + course.price, 0);

  let discount = 0;

  if (selectedCourses.length === 1) {
    discount = 0;
  } else if (selectedCourses.length === 2) {
    discount = subtotal * 0.05;
  } else if (selectedCourses.length === 3) {
    discount = subtotal * 0.1;
  } else if (selectedCourses.length >= 4) {
    discount = subtotal * 0.15;
  }

  const discountAmount = subtotal * (discount / 100);
  const total = subtotal - discountAmount;


//homepage//
const renderHomePage = () => (
  <SafeAreaView style={styles.pageContainer}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.appHeader}>
        <Text style={styles.smallLogo}>*Pawsitive logo*</Text>
        <Text style={styles.headerTitle}>Pawsitive Pet Academy</Text>
      </View>

      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeTitle}>Welcome to Pawsitive!!!</Text>
        <Text style={styles.welcomeText}>
          Learn about pet care and training with our expert instructors.
        </Text>
      </View>

      <View style={styles.homeButtons}>
        <TouchableOpacity
          style={styles.blueButton}
          onPress={() => setCurrentScreen("courses")}
        >
          <Text style={styles.buttonText}>Pawsitive Courses</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.blueButton}
          onPress={() => setCurrentScreen("bill")}
        >
          <Text style={styles.buttonText}>Fees Calculator</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.blueButton}
          onPress={() => setCurrentScreen("contact")}
        >
          <Text style={styles.buttonText}>Contact Us</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.featuredBox}>
        <Text style={styles.sectionTitle}>Featured Course</Text>

        <Text style={styles.courseTitle}>Canine Obedience Training</Text>
        <Text style={styles.courseDescription}>12 Weeks Professional Course</Text>
        <Text style={styles.coursePrice}>R1500</Text>

        <TouchableOpacity
          style={styles.smallBlueButton}
          onPress={() => setCurrentScreen("courses")}
        >
          <Text style={styles.buttonText}>View Course</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>
);

//Courses Display page
const renderCoursesPage = () => (
  <SafeAreaView style={styles.pageContainer}>
    <View style={styles.pageHeader}>
      <TouchableOpacity onPress={() => setCurrentScreen("home")}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.pageTitle}>Courses</Text>
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      {courses.map((course, index) => {
        const isSelected = selectedCourses.some(
          (selectedCourse) => selectedCourse.name === course.name
        );

        return (
          <TouchableOpacity
            key={index}
            onPress={() => toggleCourse(course)}
            style={[
              styles.courseCard,
              isSelected && styles.selectedCourseCard,
            ]}
          >
            <View style={styles.courseInformation}>
              <Text style={styles.courseSmallText}>
                {course.duration} - {course.type}
              </Text>

              <Text style={styles.courseCardTitle}>{course.name}</Text>

              <Text style={styles.courseCardDescription}>
                {course.description}
              </Text>
            </View>

            <View style={styles.coursePriceContainer}>
              <Text style={styles.courseCardPrice}>R{course.price}</Text>

              <Text style={styles.selectionText}>
                {isSelected ? "Selected" : "Select"}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  </SafeAreaView>
);
//Billing page/"checkout"/ fees calculation 
const renderBillPage = () => (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.pageHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen("home")}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Fee Calculator</Text>
      </View>

      <View style={styles.billCard}>
        <Text style={styles.billLabel}>Subtotal</Text>
        <Text style={styles.billValue}>R{subtotal}</Text>

        <Text style={styles.billLabel}>Discount</Text>
        <Text style={styles.billValue}>R{discountAmount.toFixed(2)}</Text>

        <Text style={styles.billLabel}>Total</Text>
        <Text style={styles.billTotal}>R{total.toFixed(2)}</Text>

        {selectedCourses.length === 0 ? (
          <Text style={styles.emptyText}>Select one or more courses to calculate fees.</Text>
        ) : (
          <TouchableOpacity
            style={styles.blueButton}
            onPress={() => setCurrentScreen("courses")}
          >
            <Text style={styles.buttonText}>Add More Courses</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>

  );

  //contact us page
  const renderContactPage = () => (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.pageHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen("home")}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Contact Us</Text>
      </View>

      <View style={styles.contactCard}>
        <Text style={styles.contactText}>Email: hello@pawsitiveacademy.co.za</Text>
        <Text style={styles.contactText}>Phone: +27 11 555 0142</Text>
        <Text style={styles.contactText}>Instagram: @PawsitivePetAcademy</Text>
      </View>
    </SafeAreaView>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingScreen}>
        <Text style={styles.loadingTitle}>Pawsitive</Text>
        <Text style={styles.loadingSubtitle}>Pet Academy</Text>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  switch (currentScreen) {
    case "home":
      return renderHomePage();
    case "courses":
      return renderCoursesPage();
    case "bill":
      return renderBillPage();
    case "contact":
      return renderContactPage();
    default:
      return renderHomePage();
  }
}


const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
  },

  loadingTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#9A6B00",
    paddingTop: 10,
    paddingHorizontal: 25,
  },

  loadingSubtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#9A6B00",
    paddingBottom: 10,
    paddingHorizontal: 25,
  },

  loadingText: {
    fontSize: 18,
    marginTop: 30,
  },

  appHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  smallLogo: {
    fontSize: 25,
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: "bold",
  },

  profileIcon: {
    fontSize: 28,
  },

  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  pageTitle: {
    fontSize: 27,
    fontWeight: "bold",
  },

  backButton: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderColor: "#111",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 30,
  },

  welcomeBox: {
    backgroundColor: "#C8C8C8",
    borderRadius: 25,
    padding: 25,
    marginBottom: 20,
  },

  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  welcomeText: {
    fontSize: 16,
    lineHeight: 23,
  },

  homeButtons: {
    gap: 15,
    marginBottom: 25,
  },

  blueButton: {
    backgroundColor: "#45A9D6",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
  },

  smallBlueButton: {
    backgroundColor: "#45A9D6",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 15,
  },

  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

  featuredBox: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 25,
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  courseDescription: {
    color: "#666",
  },

  coursePrice: {
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 15,
  },

  courseCard: {
    backgroundColor: "#C8C4C4",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#e5e5e5",
  },

  selectedCourseCard: {
    borderWidth: 3,
    borderColor: "#45A9D6",
  },

  courseInformation: {
    flex: 1,
    paddingRight: 10,
  },

  courseSmallText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
    textTransform: "uppercase",
  },

  courseCardTitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 7,
    marginTop: 7,
  },

  courseCardDescription: {
    fontSize: 20,
    color: "#555",
  },

  coursePriceContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },

  courseCardPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },

  selectionText: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "#45A9D6",
  },

  billCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },

  billLabel: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
  },

  billValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },

  billTotal: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 4,
    color: "#45A9D6",
  },

  emptyText: {
    marginTop: 16,
    color: "#666",
  },

  payButton: {
    width: '70%',
    alignSelf: "center",
    backgroundColor: "#45A9D6",
    borderRadius: 40,
    paddingVertical: 17,
    alignItems: "center",
    marginBottom: 30,
  },

  payText: { 
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },

  contactCard: {
    backgroundColor: "#C8C8C8",
    borderRadius: 25,
    padding: 25,
    marginBottom: 20,
  },

  contactText: {
    fontSize: 16,
    lineHeight: 28,
  },

  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  contactIcon: {
    fontSize: 32,
    width: 55,
  },

  contactInformation: {
    fontSize: 16,
    flex: 1,
  }

});


