import pool from '../lib/db'

async function seedUsers() {
  const batchSize = 1000
  const total = 400000
  const parent_user_id = 1

  for (let i = 0; i < total; i += batchSize) {
    const values = []

    for (let j = i; j < i + batchSize && j < total; j++) {
      values.push([
        `User ${j + 1}`,
        `user${j + 1}@example.com`,
        'User',
        parent_user_id,
      ])
    }

    await pool.query(
      'INSERT INTO sub_users (name, email, role, parent_user_id) VALUES ?',
      [values]
    )

    console.log(`✅ Inserted ${Math.min(i + batchSize, total)}`)
  }

  console.log('🎉 1 lakh users created successfully')
  process.exit(0)
}

seedUsers().catch(err => {
  console.error(err)
  process.exit(1)
})
