
export const contentUnits = [
    {
        id: '1',
        code: 'MATH-101',
        title: 'Introduction to Algebra',
        description: 'Basic algebraic concepts and operations',
        content: `
      <h1>Chapter 1: Basic Concepts</h1>
      <p>Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols.</p>
      <h2>1.1 Variables and Constants</h2>
      <ul>
        <li><strong>Variable:</strong> A symbol (usually a letter) that represents a number that may change.</li>
        <li><strong>Constant:</strong> A fixed value that does not change.</li>
      </ul>
      <h2>1.2 Expressions and Equations</h2>
      <ul>
        <li><strong>Expression:</strong> A combination of variables, numbers and operations.</li>
        <li><strong>Equation:</strong> A statement that two expressions are equal.</li>
      </ul>
    `,
        contentType: 'html',
        explanation: 'Covers the basics of algebra including variables, constants, expressions, and equations.',
        language: 'en',
        status: 'published',
        questionsCount: 12,
        studentsEnrolled: 45,
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20',
        createdBy: 'Dr. Smith',
        correct:"no",
        attachments: [
            { name: 'Worksheet.pdf', type: 'pdf', size: '2.4 MB' },
            { name: 'Practice Problems.docx', type: 'doc', size: '1.8 MB' }
        ],
        relatedResources: [
            { id: '2', title: 'Advanced Algebra Concepts', type: 'video' },
            { id: '4', title: 'Algebraic Equations Practice', type: 'text' }
        ],
        minimumReviews: 3,
        totalRevies: 1,
        reviewStatus: 'pending',
        comments: [
            {
                id: '1',
                user: 'Reviewer A',
                text: 'Clear and well-structured question.',
                type: 'approved',
                createdAt: '2024-01-16'
            }
        ]
    },
    {
        id: '2',
        code: 'MATH-102',
        title: 'Linear Equations',
        description: 'Solving and graphing linear equations',
        content: `
      <h1>Chapter 2: Linear Equations</h1>
      <p>Linear equations form the foundation of algebra and represent relationships with a constant rate of change.</p>
      <h2>2.1 Standard Form</h2>
      <ul>
        <li>Ax + By = C, where A, B, and C are real numbers.</li>
      </ul>
      <h2>2.2 Slope-Intercept Form</h2>
      <ul>
        <li>y = mx + b, where m is the slope and b is the y-intercept.</li>
      </ul>
      <h2>2.3 Graphing</h2>
      <ul>
        <li>Plotting the y-intercept and using the slope to find other points.</li>
      </ul>
    `,
        contentType: 'html',
        explanation: 'Introduces forms of linear equations and how to graph them using slope and intercept.',
        language: 'en',
        status: 'draft',
        questionsCount: 9,
        studentsEnrolled: 32,
        createdAt: '2024-02-01',
        updatedAt: '2024-02-05',
        createdBy: 'Prof. Allen',
        attachments: [
            { name: 'Graphing Worksheet.pdf', type: 'pdf', size: '1.2 MB' }
        ],
        relatedResources: [
            { id: '3', title: 'Graphing Lines Tutorial', type: 'video' }
        ],
        minimumReviews: 3,
        totalRevies: 0,
        correct:"no",
        reviewStatus: 'pending',
        comments: []
    },
    {
        id: '3',
        code: 'MATH-103',
        title: 'Quadratic Equations',
        description: 'Understanding and solving quadratic equations',
        content: `
      <h1>Chapter 3: Quadratic Equations</h1>
      <p>Quadratic equations involve terms up to the second degree and are solved using various methods.</p>
      <h2>3.1 Standard Form</h2>
      <ul>
        <li>ax² + bx + c = 0, where a, b, and c are real numbers and a ≠ 0.</li>
      </ul>
      <h2>3.2 Solving Methods</h2>
      <ul>
        <li>Factoring</li>
        <li>Completing the square</li>
        <li>Quadratic formula</li>
      </ul>
      <h2>3.3 Discriminant</h2>
      <ul>
        <li>b² - 4ac determines the nature of the roots.</li>
      </ul>
    `,
        contentType: 'html',
        explanation: 'Focuses on the structure of quadratic equations and the different methods used to solve them.',
        language: 'en',
        status: 'published',
        questionsCount: 14,
        studentsEnrolled: 39,
        createdAt: '2024-03-10',
        updatedAt: '2024-03-15',
        createdBy: 'Ms. Kapoor',
        attachments: [
            { name: 'Quadratic Exercises.pdf', type: 'pdf', size: '2.1 MB' }
        ],
        relatedResources: [
            { id: '5', title: 'Quadratic Formula Explained', type: 'text' }
        ],
        minimumReviews: 3,
        totalRevies: 3,
        correct: "yes",
        reviewStatus: 'completed',
        comments: [
            {
                id: '2',
                user: 'Reviewer B',
                text: 'Consider adding a real-world example.',
                type: 'suggestion',
                createdAt: '2024-03-16'
            },
            {
                id: '3',
                user: 'Reviewer C',
                text: 'Typo in the discriminant explanation.',
                type: 'flagged',
                createdAt: '2024-03-17'
            }
        ]
    }
];

export const questionBank = [
    {
        id: 'math',
        name: 'Mathematics',
        children: [
            {
                id: 'algebra',
                name: 'Algebra',
                questions: [],
                children: [
                    {
                        id: 'basic-algebra',
                        name: 'Basic Operations',
                        questionCount: 25,
                        questions: [
                            {
                                question: 'Solve for x: 2x + 5 = 13',
                                difficulty: 'Easy',
                                options: ['x = 4', 'x = 6', 'x = 8', 'x = 9'],
                                correctAnswer: 'A',
                                explanation: 'Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4',
                                reviewStatus: 'approved',
                                createdBy: 'Dr. Smith',
                                createdAt: '2024-01-15',
                                comments: [
                                    {
                                        id: '1',
                                        user: 'Reviewer A',
                                        text: 'Clear and well-structured question.',
                                        type: 'approved',
                                        createdAt: '2024-01-16',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'equations',
                        name: 'Linear Equations',
                        questionCount: 18,
                        questions: [
                            {
                                id: '4',
                                question: 'Find the value of x: 3x - 7 = 11',
                                difficulty: 'Easy',
                                options: ['x = 4', 'x = 6', 'x = 5', 'x = 7'],
                                correctAnswer: 'B',
                                explanation: 'Add 7 to both sides: 3x = 18, then divide by 3: x = 6',
                                reviewStatus: 'approved',
                                createdBy: 'Dr. Lin',
                                createdAt: '2024-01-12',
                                comments: [],
                            },
                        ],
                    },
                    {
                        id: 'quadratic',
                        name: 'Quadratic Equations',
                        questionCount: 12,
                        questions: [
                            {
                                id: '5',
                                question: 'Solve: x² - 5x + 6 = 0',
                                difficulty: 'Medium',
                                options: ['x = 1 or x = 6', 'x = 2 or x = 3', 'x = -2 or x = -3', 'x = 0'],
                                correctAnswer: 'B',
                                explanation: 'Factor the equation: (x - 2)(x - 3) = 0, so x = 2 or x = 3',
                                reviewStatus: 'approved',
                                createdBy: 'Dr. Patel',
                                createdAt: '2024-01-10',
                                comments: [],
                            },
                        ],
                    },
                ],
            },
            {
                id: 'geometry',
                name: 'Geometry',
                children: [
                    {
                        id: 'basic-shapes',
                        name: 'Basic Shapes',
                        questionCount: 15,
                        questions: [
                            {
                                id: '6',
                                question: 'How many sides does a hexagon have?',
                                type: 'Multiple Choice',
                                difficulty: 'Easy',
                                options: ['5', '6', '7', '8'],
                                correctAnswer: 'B',
                                explanation: 'A hexagon has 6 sides.',
                                reviewStatus: 'approved',
                                createdBy: 'Prof. Alice',
                                createdAt: '2024-01-17',
                                comments: [],
                            },
                        ],
                    },
                    {
                        id: 'triangles',
                        name: 'Triangles',
                        questionCount: 22,
                        questions: [
                            {
                                id: '2',
                                question: 'What is the area of a triangle with base 10 cm and height 8 cm?',
                                type: 'Short Answer',
                                topic: 'triangles',
                                difficulty: 'Medium',
                                correctAnswer: '40 square cm',
                                explanation: 'Area of triangle = (1/2) × base × height = (1/2) × 10 × 8 = 40 sq cm',
                                reviewStatus: 'pending',
                                createdBy: 'Prof. Johnson',
                                createdAt: '2024-01-18',
                                comments: [
                                    {
                                        id: '2',
                                        user: 'Reviewer B',
                                        text: 'Consider adding a diagram for better understanding.',
                                        type: 'suggestion',
                                        createdAt: '2024-01-19',
                                    },
                                ],
                            },
                            {
                                id: '7',
                                question: 'What is the sum of interior angles in any triangle?',
                                type: 'Multiple Choice',
                                difficulty: 'Easy',
                                options: ['180°', '360°', '90°', '270°'],
                                correctAnswer: 'A',
                                explanation: 'The sum of the interior angles in a triangle is always 180°.',
                                reviewStatus: 'approved',
                                createdBy: 'Dr. Green',
                                createdAt: '2024-01-19',
                                comments: [],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 'science',
        name: 'Science',
        children: [
            {
                id: 'physics',
                name: 'Physics',
                children: [
                    {
                        id: 'mechanics',
                        name: 'Mechanics',
                        questionCount: 30,
                        questions: [
                            {
                                id: '3',
                                question: 'Explain Newton first law of motion with an example.',
                                type: 'Long Answer',
                                topic: 'mechanics',
                                difficulty: 'Hard',
                                correctAnswer:
                                    'An object at rest stays at rest and an object in motion stays in motion unless acted upon by an external force.',
                                explanation:
                                    'This law describes inertia - the tendency of objects to resist changes in their state of motion.',
                                reviewStatus: 'needs_review',
                                createdBy: 'Dr. Williams',
                                createdAt: '2024-01-20',
                                comments: [
                                    {
                                        id: '3',
                                        user: 'Reviewer C',
                                        text: 'The question is good but needs more specific criteria for evaluation.',
                                        type: 'needs_edit',
                                        createdAt: '2024-01-21',
                                    },
                                ],
                            },
                            {
                                id: '8',
                                question: 'What is the SI unit of force?',
                                type: 'Multiple Choice',
                                difficulty: 'Easy',
                                options: ['Newton', 'Joule', 'Watt', 'Pascal'],
                                correctAnswer: 'A',
                                explanation: 'The SI unit of force is the Newton (N).',
                                reviewStatus: 'approved',
                                createdBy: 'Dr. Evans',
                                createdAt: '2024-01-22',
                                comments: [],
                            },
                        ],
                    },
                    {
                        id: 'electricity',
                        name: 'Electricity',
                        questionCount: 20,
                        questions: [
                            {
                                id: '9',
                                question: 'Define electric current.',
                                type: 'Short Answer',
                                topic: 'electricity',
                                difficulty: 'Medium',
                                correctAnswer: 'The flow of electric charge through a conductor.',
                                explanation:
                                    'Electric current is defined as the rate at which charge flows through a surface.',
                                reviewStatus: 'approved',
                                createdBy: 'Prof. Lee',
                                createdAt: '2024-01-23',
                                comments: [],
                            },
                            {
                                id: '10',
                                question: 'Which device is used to measure electric current?',
                                type: 'Multiple Choice',
                                difficulty: 'Easy',
                                options: ['Voltmeter', 'Ammeter', 'Galvanometer', 'Ohmmeter'],
                                correctAnswer: 'B',
                                explanation: 'Electric current is measured using an ammeter.',
                                reviewStatus: 'approved',
                                createdBy: 'Prof. Lee',
                                createdAt: '2024-01-23',
                                comments: [],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export const reviews = [...contentUnits, ...questionBank];

export const learningUnits = [
        {
            id: "1",
            title: "Introduction to React",
            type: "lecture",
            course: "Web Development",
            uploadDate: "2023-10-15",
            downloadUrl: "#",
            fileSize: "2.5 MB",
            status: "published"
        },
        {
            id: "2",
            title: "Assignment 1: Components",
            type: "assignment",
            course: "Web Development",
            uploadDate: "2023-10-18",
            downloadUrl: "#",
            fileSize: "1.2 MB",
            status: "published"
        },
        {
            id: "3",
            title: "Advanced State Management",
            type: "lecture",
            course: "Advanced React",
            uploadDate: "2023-10-20",
            downloadUrl: "#",
            fileSize: "3.8 MB",
            status: "draft"
        },
];

export const learningUnitsLength = learningUnits.length;
export const totalQuestions = questionBank.length + contentUnits.length;
export const activeStudents = 89;
export const pendingReviews = reviews.filter(data => data.reviewStatus == "pending").length;

export const dashboardStats = [
    {
        title: 'Learning Units',
        value: learningUnitsLength,
        change: '+3 this week',
    },
    {
        title: 'Total Questions',
        value: totalQuestions,
        change: '+12 this week',
    },
    {
        title: 'Active Students',
        value: activeStudents,
        change: '+5 this week',
    },
    {
        title: 'Pending Reviews',
        value: pendingReviews,
        change: '2 urgent',
    },
];

export const recentActivies = [
    {
        id: 1,
        type: 'unit_created',
        message: 'New learning unit "Advanced Mathematics" created',
        time: '2 hours ago',
        user: 'Admin User',
    },
    {
        id: 2,
        type: 'question_submitted',
        message: '5 new questions submitted for review',
        time: '4 hours ago',
        user: 'Content Creator',
    },
    {
        id: 3,
        type: 'review_completed',
        message: 'Question review completed by 3 reviewers',
        time: '6 hours ago',
        user: 'Review Team',
    }
];