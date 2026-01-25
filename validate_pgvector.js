const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function validatePgVector() {
  try {
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: "SELECT extname, extversion FROM pg_extension WHERE extname = 'vector';"
    });
    
    if (error) {
      // Try direct query instead
      const { data: result, error: queryError } = await supabase
        .from('pg_extension')
        .select('*')
        .eq('extname', 'vector');
      
      if (queryError) {
        console.log('Using raw SQL query...');
        const { data: rawData, error: rawError } = await supabase.rpc('exec', {
          query: "SELECT * FROM pg_extension WHERE extname = 'vector';"
        });
        
        if (rawError) {
          console.error('Error:', rawError);
          process.exit(1);
        }
        console.log('✅ pgvector extension validation:');
        console.log(JSON.stringify(rawData, null, 2));
      } else {
        console.log('✅ pgvector extension validation:');
        console.log(JSON.stringify(result, null, 2));
      }
    } else {
      console.log('✅ pgvector extension validation:');
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

validatePgVector();
