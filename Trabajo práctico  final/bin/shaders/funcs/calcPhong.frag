vec3 calcPhong(vec4 lightPosition, vec3 lightColor, vec3 ambientColor, vec3 diffuseColor, vec3 specularColor, float shininess){
	// ambient
	vec3 ambient = ambientColor * lightColor * ambientStrength;
	
	// diffuse
	vec3 norm = normalize(fragNormal.z<0? -fragNormal : fragNormal);
	vec3 lightDir = normalize(vec3(lightPosition)-fragPosition*lightPosition.w); // w=0 => directional
	vec3 diffuse = diffuseColor * max(dot(norm,lightDir),0.f) * lightColor;
	
	// specular
	vec3 viewDir = normalize(-fragPosition);
	vec3 reflectDir = reflect(-lightDir,norm);
	
	//	vec3 specular = specularColor * pow(max(dot(viewDir,reflectDir),0.f),shininess) * lightColor; // phong
	vec3 halfV = normalize(lightDir + viewDir); 
	vec3 specular = specularColor * pow(max(dot(norm,halfV),0.f),shininess) * lightColor; // blinn	
	
	
	// result
	//return (ambient+diffuse+specular);
	return (ambient+diffuse+specular)/ (length(vec3(lightPosition)-fragPosition) *LightDistTravelReduction);
	
	//resultado sobre la distancia entre la posicion del fragmento y el light position y alguna constante
}
