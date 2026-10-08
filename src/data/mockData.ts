import {
  MaterialItem,
  ConceptNode,
  AssessmentQuestion,
  LearningDNAData,
  RevisionQueueItem,
  StudentAnswerRecord,
} from '../types';

export const INITIAL_MATERIALS: MaterialItem[] = [
  {
    id: 'mat-1',
    title: 'Fundamentals of Database Systems (7th Ed)',
    type: 'textbook',
    authorOrProf: 'Elmasri & Navathe',
    sizeOrDuration: '1,240 Pages (Ch 10-14 Indexed)',
    status: 'Ready',
    indexedChunks: 148,
    uploadDate: 'Oct 02, 2026',
    summary: 'Comprehensive formal foundation of the relational model, functional dependencies, 1NF/2NF/3NF/BCNF synthesis, and loss-less decomposition theorems.',
    keyTopics: ['Relational Schema', 'Functional Dependencies', '1NF, 2NF, 3NF', 'Decomposition', 'Lossless Join'],
    emphasisHighlights: [
      { topic: 'Functional Dependencies', mentions: 8, quote: 'A relation schema R is in 2NF if every non-prime attribute is fully functionally dependent on the primary key.' },
      { topic: 'Normalization & 2NF', mentions: 5, quote: 'Partial dependencies in composite keys are the primary cause of update and insertion anomalies.' }
    ]
  },
  {
    id: 'mat-2',
    title: 'CS340: Lecture 04 & 05 Slides — Schema Normalization & Joins',
    type: 'slide',
    authorOrProf: 'Prof. Marcus Vance',
    sizeOrDuration: '48 Slides',
    status: 'Ready',
    indexedChunks: 52,
    uploadDate: 'Oct 04, 2026',
    summary: 'Class slides covering SQL JOIN mechanics (INNER, LEFT, RIGHT, FULL OUTER) and Step-by-Step Normalization with real company database examples.',
    keyTopics: ['SQL Joins', 'LEFT vs RIGHT JOIN', 'Composite Keys', '2NF Anomalies', 'Transitive Dependencies'],
    emphasisHighlights: [
      { topic: '2NF Pitfalls', mentions: 4, quote: 'EXAM WARNING: Whenever you see a COMPOSITE key, immediately check if any non-prime attribute depends on just ONE part of the key.' },
      { topic: 'LEFT JOIN Nullability', mentions: 3, quote: 'Never filter on the right table inside the WHERE clause after a LEFT JOIN unless you intend to convert it into an INNER JOIN.' }
    ]
  },
  {
    id: 'mat-3',
    title: 'Lecture 08 Recording: Decomposition & 2NF vs 3NF Traps',
    type: 'video',
    authorOrProf: 'Prof. Marcus Vance',
    sizeOrDuration: '54 mins (HD + Transcript)',
    status: 'Ready',
    indexedChunks: 74,
    uploadDate: 'Oct 05, 2026',
    summary: 'Live lecture walkthrough demonstrating practical normalization examples, table decompositions, and student Q&A on partial functional dependencies.',
    keyTopics: ['2NF Decomposition', 'Composite Key Pitfalls', 'Transitive Dependencies', '3NF Candidate Keys'],
    emphasisHighlights: [
      { topic: '2NF Partial Dependency Trap', mentions: 3, quote: 'At 12:42: "Notice this! Students lose marks here every year. If your PK is (StudentID, CourseID), but Grade only depends on both, while CourseName depends only on CourseID — that is an illegal partial dependency!"' }
    ]
  },
  {
    id: 'mat-4',
    title: 'TA Review Cheatsheet: Relational Dependency & Joins',
    type: 'notes',
    authorOrProf: 'Teaching Assistant Alex Chen',
    sizeOrDuration: '6 Pages',
    status: 'Ready',
    indexedChunks: 19,
    uploadDate: 'Oct 06, 2026',
    summary: 'Quick diagnostic cheat sheet with mnemonic summaries, common student errors, and quick verification checklists for normal forms.',
    keyTopics: ['Prime vs Non-Prime', 'Quick 2NF Checklist', 'Join Execution Order'],
    emphasisHighlights: [
      { topic: 'Quick 2NF Rule', mentions: 2, quote: 'If the primary key is a SINGLE attribute, the relation is AUTOMATICALLY in 2NF if it satisfies 1NF.' }
    ]
  }
];

export const INITIAL_CONCEPTS: ConceptNode[] = [
  {
    id: 'c-db',
    name: 'Database Management Systems',
    category: 'Root',
    status: 'needs_practice',
    masteryPercentage: 72,
    definition: 'A software system designed to store, manage, and retrieve relational and structured data with ACID guarantees.',
    whyImportant: 'Core prerequisite for software engineering, backend architectures, and data engineering.',
    professorEmphasis: {
      level: 'HIGH',
      videoMentions: 12,
      slideMentions: 16,
      bookMentions: 22,
      note: 'Foundational course domain with heavy exam weight on Relational Design and SQL.'
    },
    sources: [
      {
        id: 's-root-1',
        materialType: 'textbook',
        title: 'Fundamentals of Database Systems',
        locator: 'Page 2',
        excerpt: 'Databases form the essential persistence layer of modern enterprise applications.'
      }
    ],
    children: [
      {
        id: 'c-sql',
        name: 'SQL Basics & Queries',
        category: 'Query Language',
        parentId: 'c-db',
        status: 'strong',
        masteryPercentage: 94,
        definition: 'Structured Query Language fundamentals including SELECT, WHERE, ORDER BY, GROUP BY, and aggregates.',
        whyImportant: 'Basic data manipulation and inspection.',
        professorEmphasis: {
          level: 'MEDIUM',
          videoMentions: 4,
          slideMentions: 6,
          bookMentions: 8,
          note: 'Assumed prerequisite for advanced joins and schema design.'
        },
        sources: [
          {
            id: 's-sql-1',
            materialType: 'textbook',
            title: 'Fundamentals of Database Systems',
            locator: 'Page 88',
            excerpt: 'SQL declarative statements specify what data to retrieve rather than how to compute it.'
          }
        ]
      },
      {
        id: 'c-joins',
        name: 'Relational Joins',
        category: 'Query Language',
        parentId: 'c-db',
        status: 'needs_practice',
        masteryPercentage: 62,
        definition: 'Operations combining rows from two or more tables based on a related attribute or foreign key predicate.',
        whyImportant: 'Critical for querying normalized database tables without Cartesian explosive products.',
        professorEmphasis: {
          level: 'HIGH',
          videoMentions: 7,
          slideMentions: 9,
          bookMentions: 11,
          note: 'Prof. Vance emphasized handling NULL values in OUTER JOINs across 3 consecutive lectures.'
        },
        sources: [
          {
            id: 's-j-1',
            materialType: 'slide',
            title: 'CS340 Lecture 04: Relational Joins',
            locator: 'Slide 14',
            excerpt: 'INNER JOIN retains only matching pairs. OUTER JOIN preserves unmatched tuples by padding with NULLs.'
          },
          {
            id: 's-j-2',
            materialType: 'video',
            title: 'Lecture 08 Recording',
            locator: '24:10–26:35',
            timestampSeconds: 1450,
            excerpt: 'When writing LEFT JOIN, remember the LEFT table rows are guaranteed to appear even if no matching right row exists.'
          }
        ],
        children: [
          {
            id: 'c-inner-join',
            name: 'INNER JOIN',
            category: 'Joins',
            parentId: 'c-joins',
            status: 'strong',
            masteryPercentage: 92,
            definition: 'Returns records that have matching values in both tables.',
            whyImportant: 'Standard relational equijoin.',
            professorEmphasis: {
              level: 'MEDIUM',
              videoMentions: 2,
              slideMentions: 4,
              bookMentions: 5,
              note: 'Standard baseline.'
            },
            sources: [
              {
                id: 's-ij-1',
                materialType: 'slide',
                title: 'CS340 Lecture 04',
                locator: 'Slide 16',
                excerpt: 'Equi-joins based on foreign key to primary key match.'
              }
            ]
          },
          {
            id: 'c-left-join',
            name: 'LEFT (OUTER) JOIN',
            category: 'Joins',
            parentId: 'c-joins',
            status: 'needs_practice',
            masteryPercentage: 58,
            definition: 'Returns all records from the left table, and matched records from the right table. Right non-matches return NULL.',
            whyImportant: 'Crucial when querying optional relationships without losing master entity rows.',
            professorEmphasis: {
              level: 'HIGH',
              videoMentions: 5,
              slideMentions: 6,
              bookMentions: 4,
              note: 'Frequent source of bug where students accidentally filter out NULLs in WHERE clause.'
            },
            sources: [
              {
                id: 's-lj-1',
                materialType: 'slide',
                title: 'CS340 Lecture 04',
                locator: 'Slide 22',
                excerpt: 'LEFT JOIN keeps every row from Table A; Table B columns are populated with NULL if no match exists.'
              },
              {
                id: 's-lj-2',
                materialType: 'video',
                title: 'Lecture 08 Recording',
                locator: '28:15–30:04',
                timestampSeconds: 1695,
                excerpt: 'Do not put a condition on Table B in the WHERE clause unless you want to nullify the outer join effect.'
              }
            ],
            misconceptionDetails: {
              identifiedIssue: 'Filtering on Right Table in WHERE Clause',
              reasonDetected: 'Incorrectly assumed unmatched right rows are omitted or that WHERE clause conditions do not convert outer join to inner join.',
              commonMentalTrap: 'Thinking LEFT JOIN preserves left rows even after filtering `WHERE RightTable.col = "val"` (which discards NULLs).',
              studentFailedQuestions: [
                {
                  question: 'Given `SELECT * FROM Customers c LEFT JOIN Orders o ON c.id = o.cust_id WHERE o.status = "Shipped"`, what happens to customers who placed 0 orders?',
                  studentSelected: 'They appear in the result set with NULL order values.',
                  correctAnswer: 'They are completely excluded from the result because NULL = "Shipped" evaluates to UNKNOWN/false in the WHERE clause.',
                  explanation: 'To keep customers with 0 orders, the predicate must be placed in the ON clause or explicitly check `OR o.status IS NULL`.'
                }
              ],
              remediationAction: 'Review Lecture Slide 22 and practice 3 targeted predicate placement queries.'
            }
          },
          {
            id: 'c-right-join',
            name: 'RIGHT (OUTER) JOIN',
            category: 'Joins',
            parentId: 'c-joins',
            status: 'needs_practice',
            masteryPercentage: 64,
            definition: 'Returns all records from the right table, and matched records from the left table.',
            whyImportant: 'Symmetric counter-part to LEFT JOIN.',
            professorEmphasis: {
              level: 'LOW',
              videoMentions: 1,
              slideMentions: 2,
              bookMentions: 3,
              note: 'Can usually be rewritten as LEFT JOIN by swapping table order.'
            },
            sources: [
              {
                id: 's-rj-1',
                materialType: 'textbook',
                title: 'Fundamentals of Database Systems',
                locator: 'Page 156',
                excerpt: 'RIGHT OUTER JOIN is syntactically symmetric to LEFT OUTER JOIN.'
              }
            ]
          }
        ]
      },
      {
        id: 'c-norm',
        name: 'Schema Normalization',
        category: 'Relational Design',
        parentId: 'c-db',
        status: 'weak',
        masteryPercentage: 48,
        definition: 'Systematic approach of decomposing tables to eliminate data redundancy and prevent insertion, update, and deletion anomalies.',
        whyImportant: 'Heart of relational theory; fundamental for data consistency and reliable transactional systems.',
        professorEmphasis: {
          level: 'HIGH',
          videoMentions: 11,
          slideMentions: 14,
          bookMentions: 18,
          note: 'Prof. Vance stressed: "This topic accounts for 30% of the midterm and final exam."'
        },
        sources: [
          {
            id: 's-norm-1',
            materialType: 'textbook',
            title: 'Fundamentals of Database Systems',
            locator: 'Page 143',
            excerpt: 'Normalization reduces redundancy by organizing data into well-structured relations satisfying normal form criteria.'
          },
          {
            id: 's-norm-2',
            materialType: 'slide',
            title: 'CS340 Lecture 05: Normal Forms',
            locator: 'Slide 8',
            excerpt: 'Redundancy leads to 3 classical anomalies: Insertion, Deletion, and Update anomalies.'
          },
          {
            id: 's-norm-3',
            materialType: 'video',
            title: 'Lecture 08 Recording',
            locator: '04:15–08:40',
            timestampSeconds: 255,
            excerpt: 'Always identify all Candidate Keys first before declaring any normal form.'
          }
        ],
        children: [
          {
            id: 'c-1nf',
            name: 'First Normal Form (1NF)',
            category: 'Normalization',
            parentId: 'c-norm',
            status: 'strong',
            masteryPercentage: 90,
            definition: 'Requires that the domain of each attribute contains only atomic (indivisible) values and no repeating groups.',
            whyImportant: 'Baseline prerequisite for any relational relation.',
            professorEmphasis: {
              level: 'MEDIUM',
              videoMentions: 3,
              slideMentions: 5,
              bookMentions: 6,
              note: 'Easily understood by students (eliminating comma-separated lists and nested tables).'
            },
            sources: [
              {
                id: 's-1nf-1',
                materialType: 'textbook',
                title: 'Fundamentals of Database Systems',
                locator: 'Page 147',
                excerpt: '1NF disallows multi-valued attributes and composite attributes.'
              }
            ]
          },
          {
            id: 'c-2nf',
            name: 'Second Normal Form (2NF)',
            category: 'Normalization',
            parentId: 'c-norm',
            status: 'weak',
            masteryPercentage: 38,
            definition: 'Must be in 1NF and every non-prime attribute must be FULLY functionally dependent on every candidate key (no partial functional dependency).',
            whyImportant: 'Eliminates partial key dependencies which cause update anomalies in relations with composite keys.',
            professorEmphasis: {
              level: 'HIGH',
              videoMentions: 9,
              slideMentions: 12,
              bookMentions: 10,
              note: 'FLAGGED EXAM TOPIC: Prof. Vance spent 25 minutes dissecting composite primary key partial dependencies.'
            },
            sources: [
              {
                id: 's-2nf-1',
                materialType: 'textbook',
                title: 'Fundamentals of Database Systems',
                locator: 'Page 152',
                excerpt: 'A relation schema R is in 2NF if every non-prime attribute A in R is not partially dependent on any candidate key of R.'
              },
              {
                id: 's-2nf-2',
                materialType: 'slide',
                title: 'CS340 Lecture 05: Normal Forms',
                locator: 'Slide 27',
                excerpt: 'PARTIAL DEPENDENCY RULE: If X -> Y where X is a PROPER SUBSET of any candidate key, 2NF is violated!'
              },
              {
                id: 's-2nf-3',
                materialType: 'video',
                title: 'Lecture 08 Recording',
                locator: '12:42–13:18',
                timestampSeconds: 762,
                excerpt: 'Look at slide 27: StudentID + CourseID is the composite key. But StudentName depends strictly on StudentID alone! That is a partial dependency.'
              }
            ],
            misconceptionDetails: {
              identifiedIssue: 'Confusing Partial Dependency with Transitive Dependency',
              reasonDetected: 'Student failed 3 consecutive questions by misidentifying partial dependencies as transitive dependencies and assuming single-attribute keys can violate 2NF.',
              commonMentalTrap: 'Forgetting that partial dependency ONLY occurs when the primary key is COMPOSITE. If PK is a single attribute, 2NF is automatically satisfied!',
              studentFailedQuestions: [
                {
                  question: 'Relation R(A, B, C, D) with PK (A, B) and FDs: (A, B) -> C, and B -> D. What normal form violation is present?',
                  studentSelected: 'Transitive dependency violating 3NF',
                  correctAnswer: 'Partial dependency violating 2NF (B is a proper subset of PK (A, B))',
                  explanation: 'Since {B} is part of the candidate key {A, B}, the FD B -> D means non-prime attribute D depends on only a subset of the key. This is a classic 2NF violation.'
                },
                {
                  question: 'Can a relation with a single-attribute primary key violate 2NF (assuming it is already in 1NF)?',
                  studentSelected: 'Yes, if there is a functional dependency between non-prime attributes.',
                  correctAnswer: 'No, impossible. A single attribute has no proper subsets containing attributes, so partial dependency cannot exist.',
                  explanation: 'Non-prime to non-prime dependencies violate 3NF (transitive), not 2NF.'
                }
              ],
              remediationAction: 'Complete the interactive Teach-Back session on Partial Dependency and decompose R(StudentID, CourseID, StudentName, Grade).'
            }
          },
          {
            id: 'c-3nf',
            name: 'Third Normal Form (3NF)',
            category: 'Normalization',
            parentId: 'c-norm',
            status: 'weak',
            masteryPercentage: 42,
            definition: 'Must be in 2NF and have no transitive functional dependencies of non-prime attributes on candidate keys (for every X -> A, either X is a superkey or A is prime).',
            whyImportant: 'Guarantees that non-key attributes determine only other non-key attributes through candidate keys.',
            professorEmphasis: {
              level: 'HIGH',
              videoMentions: 6,
              slideMentions: 8,
              bookMentions: 9,
              note: 'Core theoretical requirement for standard production schema design.'
            },
            sources: [
              {
                id: 's-3nf-1',
                materialType: 'textbook',
                title: 'Fundamentals of Database Systems',
                locator: 'Page 158',
                excerpt: 'R is in 3NF if whenever X -> A holds in R, either X is a superkey or A is a prime attribute.'
              },
              {
                id: 's-3nf-2',
                materialType: 'slide',
                title: 'CS340 Lecture 05',
                locator: 'Slide 31',
                excerpt: 'TRANSITIVE DEPENDENCY: Non-key determining non-key (e.g. EmpID -> DeptID -> DeptName).'
              }
            ],
            misconceptionDetails: {
              identifiedIssue: 'Overlooking Prime Attribute RHS Exemption in 3NF',
              reasonDetected: 'Student marked FD as violating 3NF even when the right-hand attribute was part of a candidate key.',
              commonMentalTrap: 'Assuming any X -> A where X is not a superkey violates 3NF, forgetting that if A is prime (belongs to any candidate key), 3NF is preserved.',
              studentFailedQuestions: [
                {
                  question: 'In R(A, B, C) where candidate keys are (A, B) and (A, C), does FD C -> B violate 3NF?',
                  studentSelected: 'Yes, because C is not a superkey.',
                  correctAnswer: 'No, because B is a prime attribute (part of candidate key (A, B)).',
                  explanation: '3NF allows X -> A if A is prime, whereas BCNF strictly forbids it unless X is a superkey.'
                }
              ],
              remediationAction: 'Review the prime attribute clause in 3NF vs BCNF definition.'
            }
          }
        ]
      },
      {
        id: 'c-txn',
        name: 'Transactions & ACID Properties',
        category: 'Concurrency',
        parentId: 'c-db',
        status: 'strong',
        masteryPercentage: 88,
        definition: 'Logical units of work satisfying Atomicity, Consistency, Isolation, and Durability.',
        whyImportant: 'Guarantees data validity amidst system crashes and concurrent multi-user execution.',
        professorEmphasis: {
          level: 'MEDIUM',
          videoMentions: 4,
          slideMentions: 5,
          bookMentions: 7,
          note: 'Fundamental conceptual topic.'
        },
        sources: [
          {
            id: 's-txn-1',
            materialType: 'textbook',
            title: 'Fundamentals of Database Systems',
            locator: 'Page 204',
            excerpt: 'ACID guarantees ensure transactions are executed reliably without dirty reads or phantom phenomena.'
          }
        ]
      }
    ]
  }
];

export const INITIAL_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q-diag-1',
    conceptId: 'c-norm',
    conceptName: 'Schema Normalization Overview',
    difficulty: 'Easy',
    question: 'Why do database architects normalize schemas rather than storing all application data in a single massive flat table?',
    options: [
      'To increase query execution speed by eliminating all foreign key joins.',
      'To eliminate data redundancy and prevent insertion, update, and deletion anomalies.',
      'To allow columns to store multiple comma-separated values in a single cell.',
      'To enforce hardware-level disk encryption on sensitive records.'
    ],
    correctOptionIndex: 1,
    explanation: 'The primary goal of relational normalization is eliminating unnecessary data duplication, which directly prevents anomalous states where updating a record in one row leaves duplicates out-of-sync.',
    commonMisconception: 'Believing normalization is primarily done for read query performance. In fact, normalization often trades query speed (requiring JOINs) for transactional integrity and data consistency.',
    sources: [
      {
        id: 's-q1-1',
        materialType: 'textbook',
        title: 'Fundamentals of Database Systems',
        locator: 'Page 143',
        excerpt: 'Normalization decomposes relations to prevent insertion, deletion, and modification anomalies.'
      },
      {
        id: 's-q1-2',
        materialType: 'slide',
        title: 'CS340 Lecture 05',
        locator: 'Slide 4',
        excerpt: 'Goal: Minimum redundancy, minimal update anomalies, lossless join guarantee.'
      }
    ],
    whyWrongMap: {
      0: 'Normalizing actually introduces JOINs between tables, which can slightly increase read cost to achieve consistency.',
      2: 'Storing multiple values in one cell violates 1NF (atomicity rule).',
      3: 'Encryption is a security layer feature, unrelated to relational schema normal forms.'
    }
  },
  {
    id: 'q-diag-2',
    conceptId: 'c-2nf',
    conceptName: 'Second Normal Form (2NF)',
    difficulty: 'Medium',
    question: 'A university system defines relation Enroll(StudentID, CourseID, Grade, CourseName). The primary key is the composite key (StudentID, CourseID). The functional dependencies are:\n• (StudentID, CourseID) -> Grade\n• CourseID -> CourseName\n\nWhich normal form does this relation satisfy?',
    options: [
      'It satisfies 2NF because Grade depends on both student and course.',
      'It satisfies 1NF only, because CourseName is partially dependent on CourseID (a proper subset of the composite key).',
      'It violates 1NF because CourseName is not an atomic number.',
      'It satisfies 3NF because CourseID is a valid candidate key on its own.'
    ],
    correctOptionIndex: 1,
    explanation: 'The primary key is composite: (StudentID, CourseID). CourseName is a non-prime attribute that depends strictly on CourseID alone, which is a proper subset of the primary key. This is a partial functional dependency, which violates 2NF.',
    commonMisconception: 'Assuming that because one non-prime attribute (Grade) depends on the full key, the whole table is in 2NF. 2NF requires EVERY non-prime attribute to be fully functionally dependent.',
    sources: [
      {
        id: 's-q2-1',
        materialType: 'textbook',
        title: 'Fundamentals of Database Systems',
        locator: 'Page 152',
        excerpt: 'A relation is in 2NF if every non-prime attribute is fully functionally dependent on the primary key.'
      },
      {
        id: 's-q2-2',
        materialType: 'slide',
        title: 'CS340 Lecture 05',
        locator: 'Slide 27',
        excerpt: 'Partial Dependency: CourseID -> CourseName violates 2NF because CourseID is only part of (StudentID, CourseID).'
      },
      {
        id: 's-q2-3',
        materialType: 'video',
        title: 'Lecture 08 Recording',
        locator: '12:42–13:18',
        timestampSeconds: 762,
        excerpt: 'Prof. Vance: "CourseName depends strictly on CourseID alone! That is an illegal partial dependency that breaks 2NF."'
      }
    ],
    whyWrongMap: {
      0: 'Grade does depend on both, but CourseName depends only on CourseID, creating an illegal partial dependency that violates 2NF.',
      2: 'Values in the columns are atomic strings/integers, so 1NF is fully satisfied.',
      3: 'CourseID alone cannot uniquely identify an enrollment row, so it is NOT a candidate key.'
    }
  },
  {
    id: 'q-diag-3',
    conceptId: 'c-2nf',
    conceptName: 'Second Normal Form (2NF)',
    difficulty: 'Hard',
    question: 'Consider relation Orders(OrderID, ProductID, CustomerEmail, Quantity) with PK (OrderID, ProductID). We know CustomerEmail depends solely on OrderID. How must this relation be decomposed to achieve 2NF losslessly?',
    options: [
      'Orders(OrderID, CustomerEmail) and OrderItems(OrderID, ProductID, Quantity)',
      'Orders(OrderID, CustomerEmail) and Items(ProductID, Quantity)',
      'Orders(OrderID, ProductID) and Details(CustomerEmail, Quantity)',
      'No decomposition is required because OrderID is an indexed foreign key.'
    ],
    correctOptionIndex: 0,
    explanation: 'We isolate the partial dependency OrderID -> CustomerEmail into a separate relation R1(OrderID, CustomerEmail) with OrderID as PK. The remaining relation R2(OrderID, ProductID, Quantity) retains the full composite key where Quantity depends on both.',
    commonMisconception: 'Accidentally discarding OrderID from the second table, which destroys the relationship and violates the Lossless Join property.',
    sources: [
      {
        id: 's-q3-1',
        materialType: 'textbook',
        title: 'Fundamentals of Database Systems',
        locator: 'Page 154',
        excerpt: 'Decomposition rule for 2NF: Form a new relation for each partial dependency with the determinant as primary key.'
      },
      {
        id: 's-q3-2',
        materialType: 'slide',
        title: 'CS340 Lecture 05',
        locator: 'Slide 29',
        excerpt: 'Decomposition step: Separate R into R1(X, Y) and R2(R - Y) where X -> Y was the offending partial dependency.'
      }
    ],
    whyWrongMap: {
      1: 'Removing OrderID from the second table disconnects which order the items belong to, causing a lossy decomposition.',
      2: 'Quantity cannot be determined without knowing both OrderID and ProductID.',
      3: 'A partial dependency is present, causing update anomalies every time a customer email changes.'
    }
  },
  {
    id: 'q-diag-4',
    conceptId: 'c-left-join',
    conceptName: 'LEFT JOIN Null Handling',
    difficulty: 'Medium',
    question: 'You execute:\nSELECT c.name, o.total\nFROM Customers c\nLEFT JOIN Orders o ON c.id = o.customer_id\nWHERE o.total > 100;\n\nWhat happens to customers who have placed NO orders at all?',
    options: [
      'They appear in the output with o.total displayed as NULL.',
      'They appear in the output with o.total displayed as 0.',
      'They are eliminated from the result set completely.',
      'A runtime SQL syntax error occurs because WHERE cannot follow LEFT JOIN.'
    ],
    correctOptionIndex: 2,
    explanation: 'For customers with no orders, the LEFT JOIN generates NULL for all columns of table o. Then the WHERE clause evaluates `NULL > 100`, which in SQL 3-valued logic evaluates to UNKNOWN (treated as false in WHERE). Thus, all customers with 0 orders are eliminated, effectively converting the query into an INNER JOIN!',
    commonMisconception: 'Believing that writing "LEFT JOIN" guarantees that all left table rows will appear in the final output regardless of what you put in the WHERE clause.',
    sources: [
      {
        id: 's-q4-1',
        materialType: 'slide',
        title: 'CS340 Lecture 04: Relational Joins',
        locator: 'Slide 22',
        excerpt: 'CRITICAL PITFALL: Placing predicates on the right table in WHERE eliminates NULL rows, converting LEFT JOIN into INNER JOIN.'
      },
      {
        id: 's-q4-2',
        materialType: 'video',
        title: 'Lecture 08 Recording',
        locator: '28:15–30:04',
        timestampSeconds: 1695,
        excerpt: 'Prof. Vance: "If you want customers with zero orders to remain, put the condition in the ON clause, not the WHERE clause!"'
      }
    ],
    whyWrongMap: {
      0: 'NULL > 100 evaluates to UNKNOWN, which WHERE filters out.',
      1: 'SQL does not implicitly coerce NULL into 0 in arithmetic comparisons.',
      3: 'The query is syntactically valid SQL; it just behaves semantically like an INNER JOIN.'
    }
  },
  {
    id: 'q-diag-5',
    conceptId: 'c-3nf',
    conceptName: 'Third Normal Form (3NF)',
    difficulty: 'Hard',
    question: 'In relation Employee(EmpID, DeptID, DeptHead) with primary key EmpID, the functional dependencies are:\n• EmpID -> DeptID\n• DeptID -> DeptHead\n\nWhy does this relation violate 3NF?',
    options: [
      'It violates 1NF because DeptHead has multiple letters.',
      'It violates 2NF because DeptID is a partial key.',
      'It violates 3NF due to a transitive dependency: non-prime DeptHead is determined by non-prime DeptID.',
      'It does not violate 3NF because EmpID is a valid candidate key.'
    ],
    correctOptionIndex: 2,
    explanation: 'The primary key is a single attribute (EmpID), so 2NF is automatically satisfied. However, DeptID is a non-prime attribute that determines another non-prime attribute (DeptHead). This forms a transitive functional dependency (EmpID -> DeptID -> DeptHead), violating 3NF.',
    commonMisconception: 'Confusing transitive dependencies with partial dependencies. Partial dependencies only involve subsets of composite keys; transitive dependencies involve non-prime determinants.',
    sources: [
      {
        id: 's-q5-1',
        materialType: 'textbook',
        title: 'Fundamentals of Database Systems',
        locator: 'Page 158',
        excerpt: 'Transitive dependency X -> Y -> Z where Y and Z are non-prime violates 3NF.'
      },
      {
        id: 's-q5-2',
        materialType: 'slide',
        title: 'CS340 Lecture 05',
        locator: 'Slide 31',
        excerpt: 'Transitive Dependency: EmpID -> DeptID -> DeptHead. Fix by splitting into Employee(EmpID, DeptID) and Department(DeptID, DeptHead).'
      }
    ],
    whyWrongMap: {
      0: 'Strings with multiple letters are atomic string values, satisfying 1NF.',
      1: 'EmpID is a single attribute, not a composite key, so partial dependency is impossible.',
      3: 'The existence of EmpID -> DeptHead through DeptID causes transitive redundancy whenever multiple employees share a department.'
    }
  }
];

export const INITIAL_LEARNING_DNA: LearningDNAData = {
  conceptMastery: 72,
  retention: 68,
  problemSolving: 81,
  conceptualReasoning: 64,
  application: 75,
  learningStyle: 'Example-driven learner',
  learningStyleDescription: 'Product profile computed from interaction telemetry: Performs 34% better when concrete table instances are shown before abstract functional dependency symbols. Hesitation drops by 45% when visual diagrams accompany dependency proofs.',
  avgResponseTimeSec: 26.8,
  accuracyRate: 74,
  confidenceCalibrationScore: 68,
  streakDays: 7,
  totalQuestionsAnswered: 42,
  weakConceptsCount: 3,
  masteredConceptsCount: 9,
  difficultyProgress: {
    easyCount: 16,
    mediumCount: 18,
    hardCount: 8
  }
};

export const INITIAL_ANSWER_HISTORY: StudentAnswerRecord[] = [
  {
    questionId: 'hist-1',
    questionText: 'Which SQL keyword removes duplicate rows from a query result set?',
    conceptId: 'c-sql',
    conceptName: 'SQL Basics',
    difficulty: 'Easy',
    selectedOptionIndex: 1,
    isCorrect: true,
    confidenceRating: 5,
    timeSpentSeconds: 12,
    timestamp: '2026-10-06 14:10',
    quadrantCategory: 'Solid Mastery'
  },
  {
    questionId: 'hist-2',
    questionText: 'What is the effect of an INNER JOIN when no foreign key match is found?',
    conceptId: 'c-inner-join',
    conceptName: 'INNER JOIN',
    difficulty: 'Easy',
    selectedOptionIndex: 0,
    isCorrect: true,
    confidenceRating: 4,
    timeSpentSeconds: 15,
    timestamp: '2026-10-06 14:15',
    quadrantCategory: 'Solid Mastery'
  },
  {
    questionId: 'hist-3',
    questionText: 'In Enroll(StudentID, CourseID, Grade, CourseName), which FD violates 2NF?',
    conceptId: 'c-2nf',
    conceptName: 'Second Normal Form (2NF)',
    difficulty: 'Medium',
    selectedOptionIndex: 0, // Student answered wrongly!
    isCorrect: false,
    confidenceRating: 5, // High confidence + Wrong = Misconception!
    timeSpentSeconds: 42,
    timestamp: '2026-10-07 10:20',
    quadrantCategory: 'Dangerous Misconception'
  },
  {
    questionId: 'hist-4',
    questionText: 'Can a single-attribute primary key table violate 2NF if in 1NF?',
    conceptId: 'c-2nf',
    conceptName: 'Second Normal Form (2NF)',
    difficulty: 'Medium',
    selectedOptionIndex: 0, // Wrong!
    isCorrect: false,
    confidenceRating: 4, // High confidence + Wrong = Misconception!
    timeSpentSeconds: 34,
    timestamp: '2026-10-07 10:25',
    quadrantCategory: 'Dangerous Misconception'
  },
  {
    questionId: 'hist-5',
    questionText: 'What happens when filtering right table in WHERE clause of LEFT JOIN?',
    conceptId: 'c-left-join',
    conceptName: 'LEFT JOIN',
    difficulty: 'Medium',
    selectedOptionIndex: 0, // Wrong!
    isCorrect: false,
    confidenceRating: 4,
    timeSpentSeconds: 28,
    timestamp: '2026-10-07 11:00',
    quadrantCategory: 'Dangerous Misconception'
  },
  {
    questionId: 'hist-6',
    questionText: 'What property does ACID "I" guarantee in concurrent transactions?',
    conceptId: 'c-txn',
    conceptName: 'Transactions',
    difficulty: 'Easy',
    selectedOptionIndex: 2,
    isCorrect: true,
    confidenceRating: 2, // Low confidence + Correct = Fragile Knowledge
    timeSpentSeconds: 38,
    timestamp: '2026-10-07 16:40',
    quadrantCategory: 'Fragile Knowledge'
  },
  {
    questionId: 'hist-7',
    questionText: 'Decomposition of R(A, B, C, D) with (A, B) -> C, and B -> D into 2NF',
    conceptId: 'c-2nf',
    conceptName: 'Second Normal Form (2NF)',
    difficulty: 'Hard',
    selectedOptionIndex: 1, // Wrong
    isCorrect: false,
    confidenceRating: 2, // Low confidence + Wrong = Knowledge gap
    timeSpentSeconds: 52,
    timestamp: '2026-10-08 09:15',
    quadrantCategory: 'Knowledge Gap'
  }
];

export const INITIAL_REVISION_QUEUE: RevisionQueueItem[] = [
  {
    id: 'rev-1',
    conceptId: 'c-2nf',
    conceptName: 'Second Normal Form (2NF) — Partial Dependency',
    urgency: 'high',
    urgencyLabel: 'Weak',
    lastPracticed: '3 hours ago',
    retentionScore: 38,
    mistakeFrequency: 3,
    recommendedAction: 'Teach-Back Drill: Explain why composite keys trigger partial dependencies.'
  },
  {
    id: 'rev-2',
    conceptId: 'c-left-join',
    conceptName: 'LEFT JOIN — WHERE Clause Null Trap',
    urgency: 'medium',
    urgencyLabel: 'Needs Practice',
    lastPracticed: 'Yesterday',
    retentionScore: 58,
    mistakeFrequency: 2,
    recommendedAction: 'Targeted Practice: 3 query predicate placement exercises.'
  },
  {
    id: 'rev-3',
    conceptId: 'c-3nf',
    conceptName: '3NF — Prime Attribute RHS Exemption',
    urgency: 'medium',
    urgencyLabel: 'Review Tomorrow',
    lastPracticed: '2 days ago',
    retentionScore: 64,
    mistakeFrequency: 1,
    recommendedAction: 'Concept Flashcard: Review BCNF vs 3NF prime attribute rule.'
  },
  {
    id: 'rev-4',
    conceptId: 'c-sql',
    conceptName: 'SQL SELECT & Aggregations',
    urgency: 'mastered',
    urgencyLabel: 'Mastered',
    lastPracticed: '5 days ago',
    retentionScore: 94,
    mistakeFrequency: 0,
    recommendedAction: 'Retention check scheduled in 7 days.'
  }
];
