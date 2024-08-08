    <?php>
    // Database connection settings
    $pdo = new PDO('mysql:host=localhost;dbname=your_database', 'your_username', 'your_password');

    // Fetch user and profile data
    $stmt = $pdo->prepare('
      SELECT 
          u.uid, u.email,
          p.isPublic, p.hasAvatar, p.avatarPath, p.profileCoverContentType,
          p.coverPath, p.firstName, p.lastName, p.full_name
      FROM users u
      JOIN profiles p ON u.uid = p.user_id
      WHERE u.uid = :uid
    ');
    $stmt->execute(['uid' => 1]); // Example user ID
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
      $userJson = json_encode([
          'uid' => $result['uid'],
          'email' => $result['email'],
          'profile' => [
              'isPublic' => $result['isPublic'],
              'hasAvatar' => $result['hasAvatar'],
              'avatarPath' => $result['avatarPath'],
              'profileCoverContentType' => $result['profileCoverContentType'],
              'coverPath' => $result['coverPath'],
              'firstName' => $result['firstName'],
              'lastName' => $result['lastName'],
              'full_name' => $result['full_name'],
          ]
      ]);
      header('Content-Type: application/json');
      echo $userJson;
    } else {
      echo json_encode(['error' => 'User not found']);
    }

    </?php>