require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ ERRO: Variáveis SUPABASE_URL ou SUPABASE_KEY não configuradas no arquivo .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Verificação automática de conexão ao iniciar o servidor
(async () => {
    if (!supabaseUrl || !supabaseKey) return;
    const { error } = await supabase
        .from('tb_usuario')
        .select('id_usuario')
        .limit(1);

    if (error) {
        console.error('⚠️ Falha ao conectar no Supabase:', error.message);
    } else {
        console.log('✅ Supabase conectado via HTTPS com sucesso!');
    }
})();

module.exports = supabase;
