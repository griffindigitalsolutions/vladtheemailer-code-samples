    import psycopg2
    import json

    # Database connection settings
    conn = psycopg2.connect(
      dbname="your_database",
      user="your_username",
      password="your_password",
      host="localhost"
    )

    # Fetch user and profile data
    with conn.cursor() as cur:
      cur.execute('''
          SELECT 
              u.uid, u.email,
              p.is_public, p.has_avatar, p.avatar_path, p.profile_cover_content_type,
              p.cover_path, p.first_name, p.last_name, p.full_name
          FROM users u
          JOIN profiles p ON u.uid = p.user_id
          WHERE u.uid = %s
      ''', (1,))  # Example user ID
      result = cur.fetchone()
      
    if result:
      user_data = {
          'uid': result[0],
          'email': result[1],
          'profile': {
              'isPublic': result[2],
              'hasAvatar': result[3],
              'avatarPath': result[4],
              'profileCoverContentType': result[5],
              'coverPath': result[6],
              'firstName': result[7],
              'lastName': result[8],
              'full_name': result[9],
          }
      }
      user_json = json.dumps(user_data)
      print(user_json)
    else:
      print(json.dumps({'error': 'User not found'}))