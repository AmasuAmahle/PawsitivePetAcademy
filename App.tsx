import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Screens I have
type Screen = "home" | "courses" | "bill" | "contact" | "about" | "individual";

// Course structure
interface Course {
  name: string;
  duration: string;
  type: string;
  price: number;
  description: string;
  image: any;
}

// Available courses
const courses: Course[] = [
  {
    name: "Canine Obedience Training",
    duration: "12 WEEKS",
    type: "PROFESSIONAL",
    price: 1500,
    description:
      "Learn professional obedience techniques for dogs from experienced professionals.",
    image: require("./assets/canineobedience.png"),
  },
  {
    name: "Puppy Care",
    duration: "6 WEEKS",
    type: "SHORT COURSE",
    price: 750,
    description: "Learn how to care for your puppy in the best ways possible.",
    image: require("./assets/puppycare.png"),
  },
  {
    name: "Pet Grooming",
    duration: "6 MONTHS",
    type: "PROFESSIONAL",
    price: 1500,
    description: "To provide professional grooming skills for domestic pets.",
    image: require("./assets/petgrooming.png"),
  },
  {
    name: "Animal Behaviour",
    duration: "6 MONTHS",
    type: "PROFESSIONAL",
    price: 1500,
    description:
      "To understand common pet behaviours and improve communication with animals.",
    image: require("./assets/animalbehaviour.png"),
  },
  {
    name: "Pet Business Management",
    duration: "6 MONTHS",
    type: "PROFESSIONAL",
    price: 1500,
    description:
      "To prepare learners to operate a successful pet-related business.",
    image: require("./assets/petbusinessmanagement.png"),
  },
  {
    name: "Pet First Aid",
    duration: "6 WEEKS",
    type: "SHORT COURSE",
    price: 750,
    description:
      "To provide learners with the knowledge and skills to respond to pet emergencies.",
    image: require("./assets/petfirstaid.png"),
  },
  {
    name: "Basic Dog Walking",
    duration: "6 WEEKS",
    type: "SHORT COURSE",
    price: 750,
    description: "To teach safe and professional dog walking practices.",
    image: require("./assets/basicdogwalking.png"),
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course>(courses[0]);

  // Contact form state
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const isCourseSelected = (course: Course) =>
    selectedCourses.some((c) => c.name === course.name);

  const toggleCourse = (course: Course) => {
    if (isCourseSelected(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c.name !== course.name));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  // Redirection to individual page
  const openCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentScreen("individual");
  };

  const sendMessage = () => {
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      Alert.alert("Missing details", "Please fill in your name, email and message.");
      return;
    }
    Alert.alert("Message sent", "Thank you for contacting Pawsitive Pet Academy.");
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  // Fees calculation
  const subtotal = selectedCourses.reduce(
    (sum, course) => sum + course.price,
    0
  );

  let discountPercentage = 0;
  if (selectedCourses.length === 2) {
    discountPercentage = 5;
  } else if (selectedCourses.length === 3) {
    discountPercentage = 10;
  } else if (selectedCourses.length >= 4) {
    discountPercentage = 15;
  }

  const discountAmount = subtotal * (discountPercentage / 100);
  const total = subtotal - discountAmount;

  const renderLogo = () => (
    <Image
      source={require("./assets/pawsitivelogo.png")}
      style={styles.logoImage}
    />
  );

  // Header
  const renderHeader = () => (
    <View style={styles.appHeader}>
      {renderLogo()}
      <Text style={styles.headerTitle}>Pawsitive Pet Academy</Text>
    </View>
  );

  // Home page
  const renderHomePage = () => (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderHeader()}

        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeTitle}>Welcome to Pawsitive!!</Text>

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

        <Text style={styles.sectionTitle}>Featured Course</Text>

        <TouchableOpacity
          style={styles.featuredCourseCard}
          onPress={() => openCourse(courses[0])}
        >
          <Image source={courses[0].image} style={styles.featuredImage} />

          <View style={styles.featuredInformation}>
            <Text style={styles.courseTitle}>{courses[0].name}</Text>

            <Text style={styles.courseSmallText}>
              {courses[0].duration} - {courses[0].type}
            </Text>

            <Text style={styles.coursePrice}>R{courses[0].price}</Text>

            <Text style={styles.featuredDescription}>
              {courses[0].description}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.blueButton}
          onPress={() => setCurrentScreen("about")}
        >
          <Text style={styles.buttonText}>About Us</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );

  // Courses display page
  const renderCoursesPage = () => (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.pageHeader}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => setCurrentScreen("home")}>
            <Text style={styles.backText}>&lt;</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Courses</Text>
        </View>

        {renderLogo()}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {courses.map((course) => {
          const isSelected = isCourseSelected(course);

          return (
            <TouchableOpacity
              key={course.name}
              onPress={() => openCourse(course)}
              style={[styles.courseCard, isSelected && styles.selectedCourseCard]}
            >
              <Image source={course.image} style={styles.courseImage} />

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

                <TouchableOpacity onPress={() => toggleCourse(course)}>
                  <Text style={styles.selectionText}>
                    {isSelected ? "Selected" : "Select"}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={styles.blueButton}
          onPress={() => setCurrentScreen("bill")}
        >
          <Text style={styles.buttonText}>Go to Fees Calculator</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );

  // Individual course page
  const renderIndividualPage = () => {
    const isSelected = isCourseSelected(selectedCourse);

    return (
      <SafeAreaView style={styles.pageContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.pageHeader}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => setCurrentScreen("courses")}>
                <Text style={styles.backText}>&lt;</Text>
              </TouchableOpacity>

              <Text style={styles.individualHeaderTitle} numberOfLines={1}>
                {selectedCourse.name}
              </Text>
            </View>

            {renderLogo()}
          </View>

          <Image source={selectedCourse.image} style={styles.individualImage} />

          <Text style={styles.individualDuration}>
            {selectedCourse.duration} - {selectedCourse.type}
          </Text>

          <Text style={styles.individualTitle}>{selectedCourse.name}</Text>

          <View style={styles.individualSection}>
            <Text style={styles.individualSectionTitle}>Course Overview</Text>

            <Text style={styles.individualDescription}>
              {selectedCourse.description}
            </Text>

            <Text style={styles.individualDescription}>
              This course gives learners practical skills they can apply
              straight away, with guidance from experienced instructors.
            </Text>
          </View>

          <Text style={styles.coursePrice}>R{selectedCourse.price}</Text>

          <TouchableOpacity
            style={[styles.blueButton, { marginTop: 15 }]}
            onPress={() => {
              if (!isSelected) {
                toggleCourse(selectedCourse);
              }
              setCurrentScreen("bill");
            }}
          >
            <Text style={styles.buttonText}>
              {isSelected ? "Selected - View Fees" : "Add to Selection"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // Billing page / fees calculation
  const renderBillPage = () => (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pageHeader}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => setCurrentScreen("home")}>
              <Text style={styles.backText}>&lt;</Text>
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Fees Calculator</Text>
          </View>

          {renderLogo()}
        </View>

        <Text style={styles.calculatorHeading}>Selected Courses</Text>

        <View style={styles.selectedCoursesCard}>
          {selectedCourses.length === 0 ? (
            <Text style={styles.emptyText}>No courses selected.</Text>
          ) : (
            selectedCourses.map((course) => (
              <View key={course.name} style={styles.selectedCourseRow}>
                <Text style={styles.selectedCourseName}>{course.name}</Text>

                <Text style={styles.selectedCoursePrice}>R{course.price}</Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.billCard}>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Subtotal</Text>
            <Text style={styles.billValue}>R{subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Discount ({discountPercentage}%)</Text>
            <Text style={styles.billValue}>-R{discountAmount.toFixed(2)}</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Total</Text>
            <Text style={styles.billTotal}>R{total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.discountCard}>
          <Text style={styles.discountTitle}>Discount Rates</Text>

          <Text style={styles.discountText}>1 course - 0%</Text>
          <Text style={styles.discountText}>2 courses - 5%</Text>
          <Text style={styles.discountText}>3 courses - 10%</Text>
          <Text style={styles.discountText}>4 or more courses - 15%</Text>
        </View>

        <TouchableOpacity
          style={styles.blueButton}
          onPress={() => setCurrentScreen("courses")}
        >
          <Text style={styles.buttonText}>Add More Courses</Text>
        </TouchableOpacity>

        {selectedCourses.length > 0 && (
          <TouchableOpacity
            style={styles.blueButton}
            onPress={() => setSelectedCourses([])}
          >
            <Text style={styles.buttonText}>Clear Selection</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );

  // Contact us page
  const renderContactPage = () => (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.pageHeader}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => setCurrentScreen("home")}>
              <Text style={styles.backText}>&lt;</Text>
            </TouchableOpacity>

            <Text style={styles.pageTitle}>Contact Us</Text>
          </View>

          {renderLogo()}
        </View>

        <View style={styles.contactCard}>
          <Text style={styles.contactText}>123 Hollard Lane</Text>
          <Text style={styles.contactText}>Durban, 748</Text>
          <Text style={styles.contactText}>+27 31 337 9263</Text>
          <Text style={styles.contactText}>info@pawsitive.co.za</Text>
        </View>

        <View style={styles.contactForm}>
          <Text style={styles.formTitle}>Send us a message</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#aaa"
            value={contactName}
            onChangeText={setContactName}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            value={contactEmail}
            onChangeText={setContactEmail}
          />

          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Message"
            placeholderTextColor="#aaa"
            multiline
            value={contactMessage}
            onChangeText={setContactMessage}
          />

          <TouchableOpacity style={styles.blueButton} onPress={sendMessage}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // About Us page
  const renderAboutPage = () => (
    <SafeAreaView style={styles.pageContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pageHeader}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => setCurrentScreen("home")}>
              <Text style={styles.backText}>&lt;</Text>
            </TouchableOpacity>

            <Text style={styles.pageTitle}>About Us</Text>
          </View>

          {renderLogo()}
        </View>

        <View style={styles.aboutCard}>
          <Text style={styles.aboutHeading}>Who We Are</Text>

          <Text style={styles.aboutText}>
            Pawsitive Pet Academy is a pet education and training platform
            dedicated to helping pet owners develop the knowledge and skills
            needed to care for their animals.
          </Text>

          <Text style={styles.aboutText}>
            We provide accessible courses covering areas such as canine
            obedience, puppy care, pet grooming, animal behaviour, pet first aid
            and dog walking.
          </Text>

          <Text style={styles.aboutHeading}>What We Offer</Text>

          <Text style={styles.aboutText}>
            Our courses are designed to provide practical learning in areas
            including:
          </Text>

          {courses.map((course) => (
            <Text key={course.name} style={styles.bulletText}>
              • {course.name}
            </Text>
          ))}

          <Text style={styles.aboutHeading}>Our Vision</Text>

          <Text style={styles.aboutText}>Happy Pets. Brighter Futures.</Text>

          <Text style={styles.aboutText}>
            We envision a community where pet owners have the confidence and
            knowledge to provide safe, responsible and loving care for their
            animals.
          </Text>

          <Text style={styles.aboutHeading}>Why Choose Pawsitive?</Text>

          <Text style={styles.bulletText}>• Professional and practical learning</Text>
          <Text style={styles.bulletText}>• Courses for different levels of experience</Text>
          <Text style={styles.bulletText}>• Focus on responsible pet ownership</Text>
          <Text style={styles.bulletText}>• Flexible course selection</Text>
          <Text style={styles.bulletText}>• Practical skills for everyday pet care</Text>
          <Text style={styles.bulletText}>• Certificates of completion</Text>

          <Text style={styles.aboutClosing}>
            Pawsitive Pet Academy — helping people build better relationships
            with their pets through knowledge, care and training.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // Loading screen
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingScreen}>
        {renderLogo()}

        <Text style={styles.loadingTitle}>Pawsitive</Text>
        <Text style={styles.loadingSubtitle}>Pet Academy</Text>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  // Screen navigation
  switch (currentScreen) {
    case "home":
      return renderHomePage();
    case "courses":
      return renderCoursesPage();
    case "bill":
      return renderBillPage();
    case "contact":
      return renderContactPage();
    case "about":
      return renderAboutPage();
    case "individual":
      return renderIndividualPage();
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

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: "bold",
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
    marginLeft: 12,
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

  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

  featuredCourseCard: {
    backgroundColor: "#D1D1D1",
    borderRadius: 15,
    padding: 12,
    flexDirection: "row",
    marginBottom: 20,
  },

  featuredImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    resizeMode: "cover",
  },

  featuredInformation: {
    flex: 1,
    marginLeft: 12,
  },

  courseTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },

  featuredDescription: {
    fontSize: 11,
    color: "#444",
    marginTop: 5,
    lineHeight: 15,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  coursePrice: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 18,
  },

  courseCard: {
    backgroundColor: "#D1D1D1",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },

  selectedCourseCard: {
    borderWidth: 2,
    borderColor: "#45A9D6",
  },

  courseInformation: {
    flex: 1,
    paddingRight: 5,
  },

  courseSmallText: {
    fontSize: 9,
    color: "#666",
    marginBottom: 4,
    textTransform: "uppercase",
  },

  courseCardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },

  courseCardDescription: {
    fontSize: 10,
    color: "#555",
    lineHeight: 13,
  },

  coursePriceContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: 55,
  },

  courseCardPrice: {
    fontSize: 14,
    fontWeight: "bold",
  },

  selectionText: {
    marginTop: 7,
    fontSize: 10,
    fontWeight: "bold",
    color: "#45A9D6",
  },

  // Individual page styles
  individualHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 12,
    flex: 1,
  },

  individualDuration: {
    fontSize: 14,
    marginBottom: 10,
  },

  individualTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  individualSection: {
    marginBottom: 20,
  },

  individualSectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },

  individualDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: "#444",
    marginBottom: 8,
  },

  // Fees calculator page
  calculatorHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  selectedCoursesCard: {
    backgroundColor: "#D1D1D1",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
  },

  selectedCourseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  selectedCourseName: {
    fontSize: 13,
    fontWeight: "bold",
    flex: 1,
  },

  selectedCoursePrice: {
    fontSize: 13,
    fontWeight: "bold",
  },

  billCard: {
    backgroundColor: "#D1D1D1",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
  },

  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  billLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },

  billValue: {
    fontSize: 14,
    fontWeight: "bold",
  },

  billTotal: {
    fontSize: 16,
    fontWeight: "bold",
  },

  emptyText: {
    color: "#666",
  },

  discountCard: {
    backgroundColor: "#D1D1D1",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },

  discountTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 12,
  },

  discountText: {
    fontSize: 14,
    marginBottom: 5,
  },

  // Contact us styles
  contactCard: {
    backgroundColor: "#D1D1D1",
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,
  },

  contactText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "500",
  },

  contactForm: {
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#111",
    padding: 15,
    marginBottom: 30,
  },

  formTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10,
    fontSize: 13,
  },

  messageInput: {
    height: 95,
    textAlignVertical: "top",
    paddingTop: 10,
  },

  // About us styles
  aboutCard: {
    backgroundColor: "#D1D1D1",
    borderRadius: 20,
    padding: 18,
    marginBottom: 25,
  },

  aboutHeading: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 6,
  },

  aboutText: {
    fontSize: 12,
    lineHeight: 17,
    color: "#444",
    marginBottom: 6,
  },

  bulletText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#444",
  },

  aboutClosing: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 18,
    lineHeight: 18,
  },

  // Images
  logoImage: {
    width: 42,
    height: 42,
    resizeMode: "contain",
  },

  courseImage: {
    width: 72,
    height: 72,
    marginRight: 10,
    borderRadius: 12,
    resizeMode: "cover",
  },

  individualImage: {
    width: "100%",
    height: 250,
    marginBottom: 15,
    borderRadius: 12,
    resizeMode: "cover",
  },
});
